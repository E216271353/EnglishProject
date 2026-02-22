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

        public GrammarQuestions AddItem(GrammarQuestions item)
        {
            _context.GrammarQuestions.Add(item); // Use Add to insert the item
            _context.SaveChanges(); // Save changes to the database
            return item;
        }

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.GrammarQuestions.Remove(existingItem); // Use Remove to delete the item
                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Grammar question not found");
            }
        }

        public List<GrammarQuestions> GetAll()
        {
            return _context.GrammarQuestions.ToList(); // Retrieve all grammar questions
        }

        public GrammarQuestions GetById(int id)
        {
            return _context.GrammarQuestions.Find(id); // Use Find for efficiency
        }

        public void UpdateItem(int id, GrammarQuestions item)
        {
            var existingItem = _context.GrammarQuestions.Find(id);
            if (existingItem != null)
            {
                existingItem.SentenceText = item.SentenceText;
                existingItem.CorrectAnswer = item.CorrectAnswer;
                existingItem.Level = item.Level;
                existingItem.Hint = item.Hint;
                existingItem.Explanation = item.Explanation;

                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Grammar question not found");
            }
        }
    }

}
