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

        [HttpPost]
        public async Task<IActionResult> AddCurrentUserLevel([FromBody] CurrentUserLevel currentUserLevel)
        {
            if (currentUserLevel == null)
            {
                return BadRequest("Current user level cannot be null.");
            }

            await _service.AddCurrentUserLevel(currentUserLevel);
            return Ok();
        }
    }
}
