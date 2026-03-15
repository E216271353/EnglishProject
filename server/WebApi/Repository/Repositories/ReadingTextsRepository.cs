using Repository.Entities;
using Repository.Interfaces;

using Repository.Entities;
using Repository.Interfaces;
using Microsoft.EntityFrameworkCore; // נדרש עבור מתודות ה-Async
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ReadingTextsRepository
    {
        private readonly IContext _context;
        public ReadingTextsRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<ReadingTexts> AddItem(ReadingTexts item)
        {
            await _context.ReadingTexts.AddAsync(item);
            await _context.SaveChanges();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var item = await GetById(id);
            if (item != null)
            {
                _context.ReadingTexts.Remove(item);
                await _context.SaveChanges();
            }
        }

        public async Task<List<ReadingTexts>> GetAll()
        {
            return await _context.ReadingTexts.ToListAsync();
        }

        public async Task<ReadingTexts> GetById(int id)
        {
            return await _context.ReadingTexts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id, ReadingTexts item)
        {
            var existingItem = await GetById(id);
            if (existingItem != null)
            {
                existingItem.Title = item.Title;
                existingItem.TextContent = item.TextContent;
                existingItem.Level = item.Level;
                // אין צורך לעדכן ידנית את ה-Id בדרך כלל

                await _context.SaveChanges();
            }
        }
        public async Task<List<ReadingTexts>> GetAllAsync()
        {
            return await _context.ReadingTexts.ToListAsync();
        }

    }
}