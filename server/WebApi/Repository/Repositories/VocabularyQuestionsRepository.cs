using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class VocabularyQuestionsRepository
    {

        private readonly IContext _context;
        public VocabularyQuestionsRepository(IContext context)
        {
            this._context = context;
        }
        public async Task<VocabularyQuestions> AddItemAsync(VocabularyQuestions item)
        {
            await Task.Run(() => _context.VocabularyQuestions.ToList().Add(item));
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItemAsync(int id)
        {
            var item = await GetByIdAsync(id);
            await Task.Run(() => _context.VocabularyQuestions.ToList().Remove(item));
            await _context.SaveChanges();
        }

        public async Task<List<VocabularyQuestions>> GetAllAsync()
        {
            return await Task.Run(() => _context.VocabularyQuestions.ToList());
        }

        public async Task<VocabularyQuestions> GetByIdAsync(int id)
        {
            return await Task.Run(() => _context.VocabularyQuestions.ToList().FirstOrDefault(x => x.Id == id));
        }

        public async Task UpdateItemAsync(int id, VocabularyQuestions item)
        {
            var vocabularyQuestion = await GetByIdAsync(id);
            vocabularyQuestion.Id = item.Id;
            vocabularyQuestion.Word = item.Word;
            vocabularyQuestion.CorrectMatch = item.CorrectMatch;
            vocabularyQuestion.Level = item.Level;
            await _context.SaveChanges();
        }
    }
}
