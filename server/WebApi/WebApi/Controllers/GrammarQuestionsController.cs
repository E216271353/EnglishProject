using Microsoft.AspNetCore.Mvc;
using Services.Interface;
using Repository.Entities;
using System.Collections.Generic;
using System.Threading.Tasks;
namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class GrammarQuestionsController : ControllerBase
    {
        private readonly IGrammarQuestions _grammarQuestionsService;

        public GrammarQuestionsController(IGrammarQuestions grammarQuestionsService)
        {
            _grammarQuestionsService = grammarQuestionsService;
        }

        [HttpGet("{level}")]
        public async Task<ActionResult<IEnumerable<GrammarQuestions>>> GetGrammarQuestionsByUserLevel(string level)
        {
            var questions = await _grammarQuestionsService.GetGrammarQuestionsByUserLevel(level);
            if (questions == null || !questions.Any())
            {
                return NotFound();
            }
            return Ok(questions);
        }
    }
}
