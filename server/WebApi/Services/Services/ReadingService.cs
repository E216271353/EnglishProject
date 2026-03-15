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
    public class ReadingService : IReadingService
    {
        private readonly ReadingQuestionsRepository _readingQuestionsRepository;
        private readonly ReadingTextsRepository _readingTextRepository;

        public ReadingService(ReadingQuestionsRepository readingQuestionsRepository,ReadingTextsRepository readingTextsRepository)
        {
            _readingQuestionsRepository = readingQuestionsRepository;
            _readingTextRepository= readingTextsRepository;
        }
        public async Task<IEnumerable<ReadingTexts>> GetReadingTextByLevel(string level)
        {
            var allTexts = await _readingTextRepository.GetAllAsync();

            return level?.ToLower() switch
            {
                "beginner" => allTexts.Where(q => q.Level?.ToLower() == "beginner"),
                "intermediate" => allTexts.Where(q => q.Level?.ToLower() == "beginner" ||
                                                          q.Level?.ToLower() == "intermediate"),
                "advanced" => allTexts, // All levels
                _ => Enumerable.Empty<ReadingTexts>()
            };
        }

        public async Task<IEnumerable<ReadingQuestions>> GetQuestionsByTextId(int readingId)
        {
            var allQuestions = await _readingQuestionsRepository.GetAllAsync();
            return allQuestions.Where(q => q.ReadingId == readingId);
        }
    }
}
