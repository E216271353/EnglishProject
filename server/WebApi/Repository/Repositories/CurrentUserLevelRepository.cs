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

        public CurrentUserLevel AddItem(CurrentUserLevel item)
        {
            _context.CurrentUserLevels.Add(item);
            _context.SaveChanges();
            return item;
        }

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.CurrentUserLevels.Remove(existingItem);
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Current user level not found");
            }
        }

        public List<CurrentUserLevel> GetAll()
        {
            return _context.CurrentUserLevels.ToList();
        }

        public async Task<List<CurrentUserLevel>> GetAllAsync()
        {
            return await _context.CurrentUserLevels.ToListAsync();
        }

        public CurrentUserLevel GetById(int id)
        {
            return _context.CurrentUserLevels.Find(id);
        }

        public void UpdateItem(int id, CurrentUserLevel item)
        {
            var existingItem = _context.CurrentUserLevels.Find(id);
            if (existingItem != null)
            {
                existingItem.UserId = item.UserId;
                existingItem.GrammarLevel = item.GrammarLevel;
                existingItem.VocabularyLevel = item.VocabularyLevel;
                existingItem.ReadingLevel = item.ReadingLevel;
                existingItem.DateUpdated = item.DateUpdated;
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Current user level not found");
            }
        }
    }
}
