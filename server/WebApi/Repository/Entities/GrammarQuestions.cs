using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class GrammarQuestions
    {
        public int Id { get; set; } 
        public string SentenceText { get; set; } 
        public string CorrectAnswer { get; set; }
        public string Level { get; set; } 
        public string Hint { get; set; }
        public string Explanation { get; set; } 
    }
}
