using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ReadingTextsController : ControllerBase
    {
        private readonly IReadingService _readingService;

        public ReadingTextsController(IReadingService readingService)
        {
            _readingService = readingService;
        }

        [HttpGet("byLevel/{level}")]
        public async Task<ActionResult<IEnumerable<ReadingTexts>>> GetTextsByLevel(string level)
        {
            if (string.IsNullOrEmpty(level))
            {
                return BadRequest("level parameter is required.");
            }

            var texts = await _readingService.GetReadingTextByLevel(level);
            return Ok(texts);
        }
    }
}
