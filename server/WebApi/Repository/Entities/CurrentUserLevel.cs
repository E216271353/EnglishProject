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
        public string GrammarLevel { get; set; }
        public string VocabularyLevel { get; set; }
        public string ReadingLevel { get; set; }
        public DateTime DateUpdated { get; set; }
    }
}
