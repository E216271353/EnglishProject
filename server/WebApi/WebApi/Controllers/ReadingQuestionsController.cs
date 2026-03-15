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

        [HttpGet("level/{level}")]
        public async Task<ActionResult<IEnumerable<ReadingQuestions>>> GetReadingQuestionByLevel(string level)
        {
            var questions = await _readingQuestionsService.GetReadingQuestionByLevel(level);
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
