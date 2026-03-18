using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Services.Dto;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly IUserService _service;
        private readonly ITokenService _tokenService; // הוספת השירות החדש

        public UserController(IUserService service, ITokenService tokenService)
        {
            _service = service;
            _tokenService = tokenService; // אתחול השירות
        }

        [HttpPost("login")]
        public async Task<ActionResult> Login([FromBody] UserLogin user)
        {
            var foundUser = await _service.Login(user);
            if (foundUser == null) return NotFound("User not found.");

            var token = _tokenService.CreateToken(foundUser);

            // מחזירים אובייקט "על המקום" בלי להגדיר לו מחלקה
            return Ok(new
            {
                id = foundUser.Id,
                username = foundUser.Username,
                token = token // הנה הטוקן מצטרף לחגיגה
            });
        }

        [HttpPost("signup")]
        public async Task<ActionResult> SignUp([FromBody] UserSignUp userSignUp)
        {
            try
            {
                var newUser = await _service.SignUp(userSignUp);

                // גם ברישום חדש כדאי להחזיר טוקן כדי שהמשתמש יתחבר אוטומטית
                var token = _tokenService.CreateToken(newUser);

                return Ok(new
                {
                    User = newUser,
                    Token = token
                });
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