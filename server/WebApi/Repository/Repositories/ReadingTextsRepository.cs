using Repository.Entities;
using Repository.Interfaces;
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
        public ReadingTexts AddItem(ReadingTexts item)
        {
            _context.ReadingTexts.ToList().Add(item);

            _context.SaveChanges();
            return item;
        }

        public void DeleteItem(int id)
        {
            _context.ReadingTexts.ToList().Remove(GetById(id));
            _context.SaveChanges();
        }

        public List<ReadingTexts> GetAll()
        {
            return _context.ReadingTexts.ToList();
        }

        public ReadingTexts GetById(int id)
        {
            return _context.ReadingTexts.ToList().FirstOrDefault(x => x.Id == id);
        }

        public void UpdateItem(int id, ReadingTexts item)
        {
            var ReadingTexts = GetById(id);
            ReadingTexts.Title = item.Title;
            ReadingTexts.TextContent = item.TextContent;
            ReadingTexts.Id = item.Id;
            ReadingTexts.Level = item.Level;
            _context.SaveChanges();
        }
    }
}
