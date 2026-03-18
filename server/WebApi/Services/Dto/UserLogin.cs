using System.ComponentModel.DataAnnotations;

namespace Services.Dto
{
    public class UserLogin
    {
        [Required(ErrorMessage = "חובה להזין כתובת אימייל")]
        [EmailAddress(ErrorMessage = "פורמט האימייל אינו תקין")]
        public string Email { get; set; }

        [Required(ErrorMessage = "חובה להזין סיסמה")]
        [MinLength(6, ErrorMessage = "הסיסמה חייבת להכיל לפחות 6 תווים")]
        public string Password { get; set; }
    }
}