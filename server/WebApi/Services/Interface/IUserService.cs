using Repository.Entities;
using Services.Dto;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Services.Interface
{
    public interface IUserService
    {
        Task<User> Login(UserLogin user);
        Task<User> SignUp(User userSignUp);
    }
}
