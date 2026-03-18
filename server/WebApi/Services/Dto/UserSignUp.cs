using System.ComponentModel.DataAnnotations;

namespace Services.Dto
{
    public class UserSignUp
    {
        [Required(ErrorMessage = "שם משתמש הוא שדה חובה")]
        [StringLength(20, MinimumLength = 2, ErrorMessage = "שם משתמש חייב להיות בין 2 ל-20 תווים")]
        public string Username { get; set; }

        [Required(ErrorMessage = "כתובת אימייל היא שדה חובה")]
        [EmailAddress(ErrorMessage = "פורמט האימייל אינו תקין")]
        public string Email { get; set; }

        [Required(ErrorMessage = "סיסמה היא שדה חובה")]
        [MinLength(8, ErrorMessage = "הסיסמה חייבת להכיל לפחות 8 תווים")]
        [RegularExpression(@"^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$", 
            ErrorMessage = "הסיסמה חייבת לכלול אות גדולה, אות קטנה ומספר")]
        public string Password { get; set; }
    }
}