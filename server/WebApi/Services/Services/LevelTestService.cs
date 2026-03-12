using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Dto;
using Services.Interface;

namespace Services.Services
{
    public class LevelTestService : ILevelTestService
    {
        private readonly LevelTestQuestionsRepository _questionsRepository;
        private readonly LevelTestResultsRepository _resultsRepository;
        public LevelTestService(LevelTestQuestionsRepository questionsRepository,LevelTestResultsRepository resultsRepository)
        {
            _questionsRepository = questionsRepository;
            _resultsRepository = resultsRepository;
        }

        public async Task<List<LevelTestQuestions>> GetAllQuestionsAsync()
        {
            try { return await _questionsRepository.GetAllAsync(); }
            catch (Exception ex) { throw new Exception("Error retrieving level test questions: " + ex.Message); }
          
        }
        public async Task<LevelTestResults> AddResultAsync(LevelTestResults ltr)
        {

            var newLevelTestResult = new LevelTestResults
            {
                CalculatedLevel=ltr.CalculatedLevel
               ,Score=ltr.Score,
                DateTaken=DateTime.UtcNow,
                UserId=ltr.UserId
                ,Id=ltr.Id
            };

            await _resultsRepository.AddItem(newLevelTestResult);
            return newLevelTestResult;
        }
    }
}
