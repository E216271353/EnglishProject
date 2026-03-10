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

        public CurrentUserLevelService(CurrentUserLevelRepository repository)
        {
            _repository = repository;
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
    }
}