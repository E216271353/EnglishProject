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

        [HttpGet("text/{readingId}")]
        public async Task<ActionResult<IEnumerable<ReadingQuestions>>> GetQuestionsByTextId(int readingId)
        {
            var questions = await _readingQuestionsService.GetQuestionsByTextId(readingId);
            return Ok(questions);
        }

        [HttpGet("level/{level}")]
        public async Task<ActionResult<IEnumerable<ReadingTexts>>> GetReadingTextByLevel(string level)
        {
            var texts = await _readingQuestionsService.GetReadingTextByLevel(level);
            return Ok(texts);
        }
    }
}
