using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class VocabularyQuestions
    {
        public int Id { get; set; } // מזהה התאמה
        public string Word { get; set; } // המילה באנגלית
        public string CorrectMatch { get; set; } // ההתאמה הנכונה
        public string Level { get; set; } // רמה מתאימה
    }
}
