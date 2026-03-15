using Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface ICurrentUserLevel
    {
        Task AddCurrentUserLevel(CurrentUserLevel currentUserLevel);
        Task<CurrentUserLevel> GetCurrentUserLevelByUserId(int UserId);
    }
}
