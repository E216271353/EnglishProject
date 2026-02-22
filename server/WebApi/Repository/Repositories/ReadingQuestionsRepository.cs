using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
    public class ReadingQuestionsRepository
    {
        private readonly IContext _context;

        public ReadingQuestionsRepository(IContext context)
        {
            this._context = context;
        }

        public ReadingQuestions AddItem(ReadingQuestions item)
        {
            _context.ReadingQuestions.Add(item);
            _context.SaveChanges(); 
            return item;
        }

        public void DeleteItem(int id)
        {
            var existingItem = GetById(id);
            if (existingItem != null)
            {
                _context.ReadingQuestions.Remove(existingItem); 
                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Reading question not found");
            }
        }

        public List<ReadingQuestions> GetAll()
        {
            return _context.ReadingQuestions.ToList();
        }

        public ReadingQuestions GetById(int id)
        {
            return _context.ReadingQuestions.Find(id); 
        }

        public void UpdateItem(int id1, ReadingQuestions item)
        {
            var existingItem = _context.ReadingQuestions.Find(id1);
            if (existingItem != null)
            {
                existingItem.ReadingId = item.ReadingId;
                existingItem.QuestionText = item.QuestionText;
                existingItem.OptionA = item.OptionA;
                existingItem.OptionB = item.OptionB;
                existingItem.OptionC = item.OptionC;
                existingItem.OptionD = item.OptionD;
                existingItem.CorrectAnswer = item.CorrectAnswer;

                _context.SaveChanges();
            }
            else
            {
                throw new Exception("Reading question not found");
            }
        }
    }

}
