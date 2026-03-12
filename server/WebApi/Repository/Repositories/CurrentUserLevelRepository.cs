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
    public class CurrentUserLevelRepository
    {
        private readonly IContext _context;

        public CurrentUserLevelRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<CurrentUserLevel> AddItem(CurrentUserLevel item)
        {
            _context.CurrentUserLevels.Add(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var existingItem = await GetByUserId(id);
            if (existingItem != null)
            {
                _context.CurrentUserLevels.Remove(existingItem);
                await _context.SaveChanges();
            }
            else
            {
                throw new Exception("Current user level not found");
            }
        }

        public async Task<List<CurrentUserLevel>> GetAll()
        {
            return await _context.CurrentUserLevels.ToListAsync();
        }

        public async Task<List<CurrentUserLevel>> GetAllAsync()
        {
            return await _context.CurrentUserLevels.ToListAsync();
        }

        public async Task<CurrentUserLevel> GetByUserId(int UserId)
        {
            return await _context.CurrentUserLevels.FindAsync(UserId);
        }

        public async Task UpdateItemAsync(int id, CurrentUserLevel item)
        {
            var existingItem = _context.CurrentUserLevels.Find(id);
            if (existingItem != null)
            {
                existingItem.UserId = item.UserId;
                existingItem.GrammarLevel = item.GrammarLevel;
                existingItem.VocabularyLevel = item.VocabularyLevel;
                existingItem.ReadingLevel = item.ReadingLevel;
                existingItem.DateUpdated = item.DateUpdated;
                await _context.SaveChanges();
            }
            else
            {
                throw new Exception("Current user level not found");
            }
        }
    }
}
