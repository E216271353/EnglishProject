using Microsoft.AspNetCore.Mvc;
using Services.Interface;
using Repository.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class LevelTestController : ControllerBase
    {
        private readonly ILevelTestService _levelTestService;

        public LevelTestController(ILevelTestService levelTestService)
        {
            _levelTestService = levelTestService;
        }

        [HttpGet("testQuestions")]
        public async Task<ActionResult<List<LevelTestQuestions>>> GetAllQuestions()
        {
            var questions = await _levelTestService.GetAllQuestionsAsync();
            return Ok(questions);
        }
    }
}
