using Services.Interface;
using System;
using System.Threading.Tasks;
using Repository.Entities;
using Repository.Repositories;

namespace Services.Services
{
    public class CurrentUserLevelService : ICurrentUserLevelService
    {
        private readonly CurrentUserLevelRepository _repository;
        private readonly LevelTestResultsRepository _levelTestResultsRepository;
        private readonly UserRepository _userRepository;

        public CurrentUserLevelService(CurrentUserLevelRepository repository, LevelTestResultsRepository levelTestResultsRepository, UserRepository userRepository)
        {
            _repository = repository;
            _levelTestResultsRepository = levelTestResultsRepository;
            _userRepository = userRepository;
        }

        public async Task AddCurrentUserLevel(CurrentUserLevel currentUserLevel)
        {
            if (currentUserLevel == null)
            {
                throw new ArgumentNullException(nameof(currentUserLevel));
            }
            await _repository.AddItem(currentUserLevel);
        }

        public async Task<CurrentUserLevel> GetCurrentUserLevelByUserId(int UserId)
        {
            return await _repository.GetByUserId(UserId);
        }

        public async Task<string?> UpdateLevel(int userId, string currentLevel)
        {
            // Get all CurrentUserLevel rows for the user, ordered by DateUpdated descending
            var allRows = await _repository.GetAllAsync();
            var userRows = allRows.Where(x => x.UserId == userId)
                                  .OrderByDescending(x => x.DateUpdated)
                                  .ToList();
            if (!userRows.Any())
                return currentLevel;

            // Get the most recent row
            var latest = userRows.First();

            // If all three levels are the same in the most recent row
            if (!string.IsNullOrEmpty(latest.GrammarLevel) &&
                latest.GrammarLevel == latest.VocabularyLevel &&
                latest.GrammarLevel == latest.ReadingLevel)
            {
                var newLevel = latest.GrammarLevel;
                if (!string.Equals(newLevel, currentLevel, StringComparison.OrdinalIgnoreCase))
                {
                    // Update user's current level
                    var user = await _userRepository.GetById(userId);
                    if (user != null)
                    {
                        user.CurrentLevel = newLevel;
                        await _userRepository.UpdateItem(userId, user);
                    }
                }
                return newLevel;
            }
            // Otherwise, return the current level
            return currentLevel;
        }

        public async Task<string?> UpdateByLastAndUpdateLevel(int userId, string category, string newLevel)
        {
            // Get all CurrentUserLevel rows for the user, ordered by DateUpdated descending
            var allRows = await _repository.GetAllAsync();
            var userRows = allRows.Where(x => x.UserId == userId)
                                  .OrderByDescending(x => x.DateUpdated)
                                  .ToList();
            if (!userRows.Any())
                return null;

            // Get the most recent row
            var latest = userRows.First();

            // Duplicate the latest row and update the specified category
            var newRow = new CurrentUserLevel
            {
                UserId = latest.UserId,
                GrammarLevel = latest.GrammarLevel,
                VocabularyLevel = latest.VocabularyLevel,
                ReadingLevel = latest.ReadingLevel,
                DateUpdated = DateTime.UtcNow
            };

            switch (category.ToLower())
            {
                case "grammar":
                    newRow.GrammarLevel = newLevel;
                    break;
                case "vocabulary":
                    newRow.VocabularyLevel = newLevel;
                    break;
                case "reading":
                    newRow.ReadingLevel = newLevel;
                    break;
            }

            await _repository.AddItem(newRow);

            // Get current level from database
            var user = await _userRepository.GetById(userId);
            var currentLevel = user?.CurrentLevel ?? "Beginner";

            // Call UpdateLevel after updating
            return await UpdateLevel(userId, currentLevel);
        }


    }
}