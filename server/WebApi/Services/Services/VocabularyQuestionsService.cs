using Repository.Entities;
using Repository.Repositories;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
        public class VocabularyQuestionsService : IVocabularyQuestions
        {
            private readonly VocabularyQuestionsRepository _repository;

            public VocabularyQuestionsService(VocabularyQuestionsRepository repository)
            {
                _repository = repository;
            }
            public async Task<IEnumerable<VocabularyQuestions>> GetVocabularyQuestions()
            {
                return await _repository.GetAllAsync();
            }
        }
    
}
