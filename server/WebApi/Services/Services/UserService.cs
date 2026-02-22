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
    public class UserService:IUserService
    {
        private readonly IRepository<User> _repository;
        public UserService(IRepository<User> _repository)
        {
            this._repository = _repository;
        }
        public User Authenticate(UserLogin user)
        {
            return _repository.GetAll().FirstOrDefault(x => x.Id == user.Id && x.Password == user.Password);
        }

        public async Task<User> SignUp(User userSignUp)// This method is unasynchronous and returns a Task<User>
        {
            var existingUser = _repository.GetAll().FirstOrDefault(x => x.Id == userSignUp.Id || x.Password == userSignUp.Password);
            if (existingUser != null)
            {
                throw new InvalidOperationException("User with this username or email already exists.");
            }

            var newUser = new User
            {
                Username = userSignUp.Username,
                Email = userSignUp.Email,
                Password = userSignUp.Password,
                PasswordHash = userSignUp.PasswordHash,
                CurrentLevel = "Beginner",
                CreatedAt = DateTime.UtcNow
            };

            _repository.AddItem(newUser);
            return newUser;
        }
    }
}
