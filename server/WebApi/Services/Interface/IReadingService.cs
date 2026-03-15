using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IReadingService
    {
        Task<IEnumerable<ReadingTexts>> GetReadingTextByLevel(string level);
        Task<IEnumerable<ReadingQuestions>> GetQuestionsByTextId(int readingId);
    }
}
