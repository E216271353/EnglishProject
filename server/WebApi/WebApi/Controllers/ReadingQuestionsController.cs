using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReadingQuestionsController : ControllerBase
    {
        private readonly IReadingService _readingQuestionsService;

        public ReadingQuestionsController(IReadingService readingQuestionsService)
        {
            _readingQuestionsService = readingQuestionsService;
        }

        [HttpGet("{level}")]
        public async Task<ActionResult<IEnumerable<ReadingQuestions>>> GetQuestionsByText(int readingId)
        {
            if (!(readingId is > 0))
            {
                return BadRequest("text parameter is required.");
            }

            var questions = await _readingQuestionsService.GetQuestionsByTextId(readingId);
            return Ok(questions);
        }

        [HttpGet("text/{readingId}")]
        public async Task<ActionResult<IEnumerable<ReadingQuestions>>> GetQuestionsByTextId(int readingId)
        {
            var questions = await _readingQuestionsService.GetQuestionsByTextId(readingId);
            return Ok(questions);
        }
    }
}
