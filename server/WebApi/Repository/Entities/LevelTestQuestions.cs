using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class LevelTestQuestions
    {
        public int Id { get; set; }
        public string QuestionText { get; set; } 
        public string OptionA { get; set; }
        public string OptionB { get; set; }
        public string OptionC { get; set; }
        public string OptionD { get; set; }
        public char CorrectAnswer { get; set; } 
        public int LevelWeight { get; set; } 
        public string Category { get; set; }
    }
}
