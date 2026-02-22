using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Repositories
{
   public class VocabularyQuestionsRepository
   {
       
            private readonly IContext _context;
            public VocabularyQuestionsRepository(IContext context)
            {
                this._context = context;
            }
            public VocabularyQuestions AddItem(VocabularyQuestions item)
            {
                _context.VocabularyQuestions.ToList().Add(item);

                _context.SaveChanges();
                return item;
            }

            public void DeleteItem(int id)
            {
                _context.VocabularyQuestions.ToList().Remove(GetById(id));
                _context.SaveChanges();
            }

            public List<VocabularyQuestions> GetAll()
            {
                return _context.VocabularyQuestions.ToList();
            }

            public VocabularyQuestions GetById(int id)
            {
                return _context.VocabularyQuestions.ToList().FirstOrDefault(x => x.Id == id);
            }

            public void UpdateItem(int id, VocabularyQuestions item)
            {
                var VocabularyQuestions = GetById(id);
                VocabularyQuestions.Id = item.Id;
                VocabularyQuestions.Word = item.Word;
                VocabularyQuestions.CorrectMatch = item.CorrectMatch;
                VocabularyQuestions.Level = item.Level;
                _context.SaveChanges();
            }
   }
}
