using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReadingQuestionsController : ControllerBase
    {
        private readonly IReadingQuestionsService _readingQuestionsService;

        public ReadingQuestionsController(IReadingQuestionsService readingQuestionsService)
        {
            _readingQuestionsService = readingQuestionsService;
        }

        [HttpGet("{level}")]
        public async Task<ActionResult<IEnumerable<ReadingQuestions>>> GetQuestionsByLevel(string level)
        {
            if (string.IsNullOrWhiteSpace(level))
            {
                return BadRequest("Level parameter is required.");
            }

            var questions = await _readingQuestionsService.GetReadingQuestionByLevel(level);
            return Ok(questions);
        }
    }
}
