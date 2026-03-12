using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Entities
{
    public class LevelTestResults
    {
        public int Id { get; set; } 
        public int UserId { get; set; } 
        public int Score { get; set; }
        public string CalculatedLevel { get; set; }
        public DateTime DateTaken { get; set; }
    }
}
