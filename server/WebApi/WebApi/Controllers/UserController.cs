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
        public async Task<ActionResult<User>> SignUp([FromBody] UserSignUp userSignUp)
        {
            try
            {
                var newUser = await _service.SignUp(userSignUp);
                return CreatedAtAction(nameof(Login), new { id = newUser.Id }, newUser);
            }
            catch (InvalidOperationException ex)
            {
                return BadRequest(ex.Message);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"An error occurred: {ex.Message}");
            }
        }
    }
}