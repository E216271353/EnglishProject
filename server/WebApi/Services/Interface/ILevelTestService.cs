using Repository.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface ILevelTestService
    {
        Task<List<LevelTestQuestions>> GetAllQuestionsAsync();
    }
}
