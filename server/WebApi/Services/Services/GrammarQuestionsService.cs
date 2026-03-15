using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class GrammarQuestionsService: IGrammarQuestions
    {
        private readonly GrammarQuestionsRepository _repository;

        public GrammarQuestionsService(GrammarQuestionsRepository repository)
        {
            _repository = repository;
        }
        public async Task<IEnumerable<GrammarQuestions>> GetGrammarQuestionsByUserLevel(string level)
        {
            
            var allQuestions = await _repository.GetAllAsync();

            var normalizedLevel = level?.ToLower();

            return normalizedLevel switch
            {
                "beginner" => allQuestions.Where(q => q.Level?.ToLower() == "beginner"),

                "intermediate" => allQuestions.Where(q => q.Level?.ToLower() == "beginner" ||
                                                       q.Level?.ToLower() == "intermediate"),

                "advanced" => allQuestions,
                _ => Enumerable.Empty<GrammarQuestions>()
            };
        }
    }
}
