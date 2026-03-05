using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class GrammarQuestionsRepository
    {
        private readonly IContext _context;

        public GrammarQuestionsRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<GrammarQuestions> AddItemAsync(GrammarQuestions item)
        {
            await _context.GrammarQuestions.AddAsync(item); // Use AddAsync to insert the item
            await _context.SaveChanges(); // Save changes to the database
            return item;
        }

        public async Task DeleteItemAsync(int id)
        {
            var existingItem = await GetByIdAsync(id);
            if (existingItem != null)
            {
                _context.GrammarQuestions.Remove(existingItem); // Use Remove to delete the item
                await _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Grammar question not found");
            }
        }

        public async Task<List<GrammarQuestions>> GetAllAsync()
        {
            return await _context.GrammarQuestions.ToListAsync(); // Retrieve all grammar questions
        }

        public async Task<GrammarQuestions> GetByIdAsync(int id)
        {
            return await _context.GrammarQuestions.FindAsync(id); // Use FindAsync for efficiency
        }

        public async Task UpdateItemAsync(int id, GrammarQuestions item)
        {
            var existingItem = await _context.GrammarQuestions.FindAsync(id);
            if (existingItem != null)
            {
                existingItem.SentenceText = item.SentenceText;
                existingItem.CorrectAnswer = item.CorrectAnswer;
                existingItem.Level = item.Level;
                existingItem.Hint = item.Hint;
                existingItem.Explanation = item.Explanation;

                await _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Grammar question not found");
            }
        }
    }
}