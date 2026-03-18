using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface ICurrentUserLevelService
    {
        Task AddCurrentUserLevel(CurrentUserLevel currentUserLevel);
        Task<CurrentUserLevel> GetCurrentUserLevelByUserId(int UserId);
        Task<string?> UpdateByLastAndUpdateLevel(int userId, string category, string newLevel);
        Task<IEnumerable<CurrentUserLevel>> GetUserProgress(int userId);
    }
}
