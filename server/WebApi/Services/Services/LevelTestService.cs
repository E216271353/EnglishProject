using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Repository.Entities;
using Repository.Repositories;
using Services.Interface;

namespace Services.Services
{
    public class LevelTestService : ILevelTestService
    {
        private readonly LevelTestQuestionsRepository _questionsRepository;

        public LevelTestService(LevelTestQuestionsRepository questionsRepository)
        {
            _questionsRepository = questionsRepository;
        }

        public async Task<List<LevelTestQuestions>> GetAllQuestionsAsync()
        {
            try { return await _questionsRepository.GetAllAsync(); }
            catch (Exception ex) { throw new Exception("Error retrieving level test questions: " + ex.Message); }
          
        }
    }
}
