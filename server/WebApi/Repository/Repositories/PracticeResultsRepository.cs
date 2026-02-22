using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class PracticeResultsRepository
    {
        private readonly IContext _context;

        public PracticeResultsRepository(IContext context)
        {
            this._context = context;
        }

        public PracticeResults AddItem(PracticeResults item)
        {
            _context.PracticeResults.Add(item); // Use Add to insert the item
            _context.SaveChanges(); // Save changes to the database
            return item;
        }

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.PracticeResults.Remove(existingItem); // Use Remove to delete the item
                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Practice result not found");
            }
        }

        public List<PracticeResults> GetAll()
        {
            return _context.PracticeResults.ToList(); // Retrieve all results
        }

        public PracticeResults GetById(int id)
        {
            return _context.PracticeResults.Find(id); // Use Find for efficiency
        }

        public void UpdateItem(int id1, PracticeResults item)
        {
            var existingItem = _context.PracticeResults.Find(id1);
            if (existingItem != null)
            {
                existingItem.UserId = item.UserId;
                existingItem.PracticeType = item.PracticeType;
                existingItem.NumCorrect = item.NumCorrect;
                existingItem.NumIncorrect = item.NumIncorrect; // This should be a count, consider changing its type if needed
                existingItem.DateAnswered = item.DateAnswered;

                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Practice result not found");
            }
        }
    }

}
