using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace Repository.Entities
{
    public class CurrentUserLevel
    {
        [Key]
        public int Id { get; set; }
        [ForeignKey("User")]
        public int UserId { get; set; }
        public int GrammarLevel { get; set; }
        public int VocabularyLevel { get; set; }
        public int ReadingLevel { get; set; }
        public DateTime DateUpdated { get; set; }
        public User User { get; set; }
    }
}
