using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class LevelTestResults
    {
        public int Id { get; set; } // מזהה תוצאה
        public int UserId { get; set; } // קישור למשתמש
        public int Score { get; set; } // ציון כולל
        public string CalculatedLevel { get; set; } // רמה שחושבה
        public DateTime DateTaken { get; set; } // תאריך ביצוע

    }
}
