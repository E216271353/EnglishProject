using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class PracticeResults
    {
        public int Id { get; set; } // מזהה תוצאה
        public int UserId { get; set; } // המשתמש
        public string PracticeType { get; set; } // סוג תרגול
        public int NumCorrect { get; set; } // מספר תשובות נכונות
        public bool NumIncorrect { get; set; } // תשובות לא נכונות
        public DateTime DateAnswered { get; set; } // תאריך מענה
    }
}
