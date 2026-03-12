using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection.Emit;
using System.Text;
using System.Threading.Tasks;

namespace english_project_server
{
    public class Database : DbContext, IContext
    {
        public Database(DbContextOptions<Database> options) : base(options)
        {
        }

        public DbSet<LevelTestQuestions> LevelTestQuestions { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<GrammarQuestions> GrammarQuestions { get; set; }
        public DbSet<PracticeResults> PracticeResults { get; set; }
        public DbSet<VocabularyQuestions> VocabularyQuestions { get; set; }
        public DbSet<LevelTestResults> LevelTestResults { get; set; }
        public DbSet<ReadingQuestions> ReadingQuestions { get; set; }
        public DbSet<ReadingTexts> ReadingTexts { get; set; }
        public DbSet<CurrentUserLevel> CurrentUserLevels { get; set; }

        public Task SaveChanges()
        {
            return base.SaveChangesAsync();
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<CurrentUserLevel>().ToTable("CurrentUserLevels");
            base.OnModelCreating(modelBuilder);
        }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=EnglishProjectDatabase;Integrated Security=true;TrustServerCertificate=True");
            }
        }
        //(localdb)\MSSQLLocalDB  conection for database
    }
}
