
using Repository.Entities;
using Repository.Interfaces;
using Services.Dto;
using Services.Interface;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Services
{
    public class UserService : IUserService
    {
        private readonly IRepository<User> _repository;
        public UserService(IRepository<User> _repository)
        {
            this._repository = _repository;
        }
        public async Task<User> Login(UserLogin user)
        {
            var users = await _repository.GetAll();
            return users.FirstOrDefault(x => x.Email == user.Email && x.Password == user.Password);
        }

        public async Task<User> SignUp(UserSignUp userSignUp)
        
       {
            var users = await _repository.GetAll();
            var existingUser = users.FirstOrDefault(x => x.Email == userSignUp.Email);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this email already exists.");
            }

            var newUser = new User
            {
                Username = userSignUp.Username,
                Email = userSignUp.Email,
                Password = userSignUp.Password,
                CurrentLevel = "Beginner",
                CreatedAt = DateTime.UtcNow
            };

            await _repository.AddItem(newUser);
            return newUser;
        }
    }
}