using Microsoft.AspNetCore.Mvc;
using Repository.Entities;
using Services.Interface;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class VocabularyQuestionsController : ControllerBase
    {
        private readonly IVocabularyQuestions _repository;

        public VocabularyQuestionsController(IVocabularyQuestions repository)
        {
            _repository = repository;
        }

        [HttpGet("{level}")]
        public async Task<ActionResult<IEnumerable<VocabularyQuestions>>> GetVocabularyQuestionsByUserLevel(string level)
        {
            var questions = await _repository.GetVocabularyQuestionsByUserLevel(level);
            return Ok(questions);
        }
    }
}
