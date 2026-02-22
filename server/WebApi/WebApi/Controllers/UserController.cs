using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Repository.Repositories;
using Services.Dto;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;

        public UserController(IUserService service)
        {
            _service = service;
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login([FromBody] UserLogin user)
        {
            var foundUser = await _service.Login(user);
            if (foundUser == null)
            {
                return NotFound("User not found.");
            }
            return Ok(foundUser);
        }

        [HttpPost("signup")]
        public async Task<ActionResult<User>> SignUp([FromBody] User userSignUp)
        {
            var newUser = await _service.SignUp(userSignUp);
            if (newUser == null)
            {
                return BadRequest("User with this ID or password already exists.");
            }
            return CreatedAtAction(nameof(Login), new { id = newUser.Id }, newUser);
        }
    }
}