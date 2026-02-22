using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class ReadingTexts
    {
        public int Id { get; set; } // מזהה קטע
        public string Title { get; set; } // כותרת הקטע
        public string TextContent { get; set; } // תוכן הקטע
        public string Level { get; set; } // רמה
    }
}
