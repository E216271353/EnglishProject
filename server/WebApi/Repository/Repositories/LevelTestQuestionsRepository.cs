using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class LevelTestQuestionsRepository
    {
        private readonly IContext _context;

        public LevelTestQuestionsRepository(IContext context)
        {
            this._context = context;
        }

        public LevelTestQuestions AddItem(LevelTestQuestions item)
        {
            _context.LevelTestQuestions.Add(item); // Use Add instead of ToList().Add
            _context.SaveChanges(); // Save changes to the database
            return item;
        }  

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.LevelTestQuestions.Remove(existingItem); // Use Remove to delete the item
                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Level test question not found");
            }
        }

        public List<LevelTestQuestions> GetAll()
        {
            return _context.LevelTestQuestions.ToList(); // Retrieve all questions
        }

        public LevelTestQuestions GetById(int id)
        {
            return _context.LevelTestQuestions.Find(id); // Use Find for efficiency
        }

        public void UpdateItem(int id1, LevelTestQuestions item)
        {
            var existingItem = _context.LevelTestQuestions.Find(id1);
            if (existingItem != null)
            {
                existingItem.QuestionText = item.QuestionText;
                existingItem.OptionA = item.OptionA;
                existingItem.OptionB = item.OptionB;
                existingItem.OptionC = item.OptionC;
                existingItem.OptionD = item.OptionD;
                existingItem.CorrectAnswer = item.CorrectAnswer;
                existingItem.LevelWeight = item.LevelWeight;

                _context.SaveChanges(); // Save changes to the database
            }
            else
            {
                throw new Exception("Level test question not found");
            }
        }
    }

}
