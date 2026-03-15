using Repository.Entities;
using Repository.Repositories;
using Repository.Interfaces;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class ReadingQuestionsService : IReadingQuestionsService
    {
        private readonly ReadingQuestionsRepository _readingQuestionsRepository;

        public ReadingQuestionsService(ReadingQuestionsRepository readingQuestionsRepository)
        {
            _readingQuestionsRepository = readingQuestionsRepository;
        }


        public async Task<IEnumerable<ReadingQuestions>> GetReadingQuestionByLevel(string level)
        {
            var allQuestions = await _readingQuestionsRepository.GetAllAsync();

            return level?.ToLower() switch
            {
                "beginner" => allQuestions.Where(q => q.Level?.ToLower() == "beginner"),
                "intermediate" => allQuestions.Where(q => q.Level?.ToLower() == "beginner" ||
                                                          q.Level?.ToLower() == "intermediate"),
                "advanced" => allQuestions, // All levels
                _ => Enumerable.Empty<ReadingQuestions>()
            };
        }
    }
}
