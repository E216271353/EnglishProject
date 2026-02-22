using Microsoft.EntityFrameworkCore;   // ✅ needed for async EF methods
using Repository.Entities;
using Repository.Interfaces;

namespace Repository.Repositories
{
    public class UserRepository : IRepository<User>
    {
        private readonly IContext _context;

        public UserRepository(IContext context)
        {
            this._context = context;
        }

        public async Task<User> AddItem(User item)
        {
            await _context.Users.AddAsync(item);        
            await _context.SaveChanges();        
            return item;
        }

        public async Task DeleteItem(int id)
        {
            var user = await GetById(id);      
            if (user != null)
            {
                _context.Users.Remove(user);         
                await _context.SaveChanges();
            }
        }

        public async Task<List<User>> GetAll()
        {
            return await _context.Users.ToListAsync(); 
        }

        public async Task<User?> GetById(int id)
        {
            return await _context.Users
                                 .FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id, User item)
        {
            User user = await GetById(id);

            if (user != null)
            {
                user.Username = item.Username;
                await _context.SaveChanges();     
            }
        }
    }
}