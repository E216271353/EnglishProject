using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class LevelTestResultsRepository
    {
        private readonly IContext _context;

        public LevelTestResultsRepository(IContext context)
        {
            this._context = context;
        }

        public LevelTestResults AddItem(LevelTestResults item)
        {
            _context.LevelTestResults.Add(item); // Use Add to insert the item
            _context.save(); // Save changes to the database
            return item;
        }

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.LevelTestResults.Remove(existingItem); // Use Remove to delete the item
                _context.save(); // Save changes to the database
            }
            else
            {
                throw new Exception("Level test result not found");
            }
        }

        public List<LevelTestResults> GetAll()
        {
            return _context.LevelTestResults.ToList(); // Retrieve all results
        }

        public LevelTestResults GetById(int id)
        {
            return _context.LevelTestResults.Find(id); // Use Find for efficiency
        }

        public void UpdateItem(int id1, LevelTestResults item)
        {
            var existingItem = _context.LevelTestResults.Find(id1);
            if (existingItem != null)
            {
                existingItem.UserId = item.UserId;
                existingItem.Score = item.Score;
                existingItem.CalculatedLevel = item.CalculatedLevel;
                existingItem.DateTaken = item.DateTaken;

                _context.save(); // Save changes to the database
            }
            else
            {
                throw new Exception("Level test result not found");
            }
        }
    }

}
