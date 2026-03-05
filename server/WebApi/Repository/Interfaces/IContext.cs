using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<LevelTestQuestions> LevelTestQuestions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<GrammarQuestions> GrammarQuestions { get; set; }
        public DbSet<PracticeResults> PracticeResults { get; set; }
        public DbSet<VocabularyQuestions> VocabularyQuestions { get; set; }
        public DbSet<LevelTestResults> LevelTestResults { get; set; }
        public DbSet<ReadingTexts> ReadingTexts { get; set; }
        public DbSet<ReadingQuestions> ReadingQuestions { get; set; }
        public DbSet<CurrentUserLevel> CurrentUserLevels { get; set; }
        public Task SaveChanges();
    }
}
