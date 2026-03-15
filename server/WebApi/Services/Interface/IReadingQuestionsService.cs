using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IReadingQuestionsService
    {
        Task<IEnumerable<ReadingQuestions>> GetReadingQuestionByLevel(string level);
    }
}
