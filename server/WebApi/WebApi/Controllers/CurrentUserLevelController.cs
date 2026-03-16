using Microsoft.AspNetCore.Mvc;
using Services.Interface;
using Repository.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CurrentUserLevelController : ControllerBase
    {
        private readonly ICurrentUserLevelService _service;

        public CurrentUserLevelController(ICurrentUserLevelService service)
        {
            _service = service;
        }

        [HttpPost("addUserLevel")]
            
        public async Task<IActionResult> AddCurrentUserLevel([FromBody] CurrentUserLevel currentUserLevel)
        {
            if (currentUserLevel == null)
            {
                return BadRequest("Current user level cannot be null.");
            }

            await _service.AddCurrentUserLevel(currentUserLevel);
            return Ok();
        }
        [HttpGet("currentuserlevel/{userId}")]
        public async Task<IActionResult> GetCurrentUserLevelByUserId(int UserId)
        {
            var currentUserLevel = await _service.GetCurrentUserLevelByUserId(UserId);
            if (currentUserLevel == null)
            {
                return NotFound();
            }
            return Ok(currentUserLevel);
        }

        [HttpPost("updateByLastAndUpdateLevel")]
        public async Task<IActionResult> UpdateByLastAndUpdateLevel(int userId, string category, string newLevel)
        {
            if (string.IsNullOrEmpty(category) || string.IsNullOrEmpty(newLevel))
            {
                return BadRequest("Request cannot be null.");
            }

            var result = await _service.UpdateByLastAndUpdateLevel(
                userId,
                category,
                newLevel
            );
            return Ok(result);
        }

        
    }
}
