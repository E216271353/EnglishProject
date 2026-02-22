using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class ReadingQuestions
    {
        public int Id { get; set; } // מזהה שאלה
        public int ReadingId { get; set; } // קישור לקטע קריאה
        public string QuestionText { get; set; } // השאלה
        public string OptionA { get; set; } // אפשרות A
        public string OptionB { get; set; } // אפשרות B
        public string OptionC { get; set; } // אפשרות C
        public string OptionD { get; set; } // אפשרות D
        public char CorrectAnswer { get; set; } // תשובה נכונה A/B/C/D
    }
}
