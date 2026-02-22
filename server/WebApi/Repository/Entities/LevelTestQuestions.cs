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
        public int Id { get; set; } // מזהה שאלה
        public string QuestionText { get; set; } // נוסח השאלה
        public string OptionA { get; set; } // תשובה א
        public string OptionB { get; set; } // תשובה ב
        public string OptionC { get; set; } // תשובה ג
        public string OptionD { get; set; } // תשובה ד
        public char CorrectAnswer { get; set; } 
        public int LevelWeight { get; set; } 
    }
}
