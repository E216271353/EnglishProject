using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace Repository.Repositories
{
    public class ReadingQuestionsRepository
    {
        private readonly IContext _context;

        public ReadingQuestionsRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<ReadingQuestions> AddItemAsync(ReadingQuestions item)
        {
            await _context.ReadingQuestions.AddAsync(item);
            await _context.SaveChanges(); 
            return item;
        }

        public async Task DeleteItemAsync(int id)
        {
            var existingItem = await GetByIdAsync(id);
            if (existingItem != null)
            {
                _context.ReadingQuestions.Remove(existingItem); 
                await _context.SaveChanges();
            }
            else
            {
                throw new Exception("Reading question not found");
            }
        }

        public async Task<List<ReadingQuestions>> GetAllAsync()
        {
            return await _context.ReadingQuestions.ToListAsync();
        }

        public async Task<ReadingQuestions> GetByIdAsync(int id)
        {
            return await _context.ReadingQuestions.FindAsync(id); 
        }

        public async Task UpdateItemAsync(int id1, ReadingQuestions item)
        {
            var existingItem = await _context.ReadingQuestions.FindAsync(id1);
            if (existingItem != null)
            {
                existingItem.ReadingId = item.ReadingId;
                existingItem.QuestionText = item.QuestionText;
                existingItem.OptionA = item.OptionA;
                existingItem.OptionB = item.OptionB;
                existingItem.OptionC = item.OptionC;
                existingItem.OptionD = item.OptionD;
                existingItem.CorrectAnswer = item.CorrectAnswer;

                await _context.SaveChanges();
            }
            else
            {
                throw new Exception("Reading question not found");
            }
        }
    }
}
