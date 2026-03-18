using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Services.Dto;
using Repository.Entities; 
namespace Services.Services
{
    using global::Services.Interface;
    using Microsoft.Extensions.Configuration;
    using Microsoft.IdentityModel.Tokens;
    using System.IdentityModel.Tokens.Jwt;
    using System.Security.Claims;
    using System.Text;

    public class TokenService : ITokenService
    {
        private readonly SymmetricSecurityKey _key;

        public TokenService(IConfiguration config)
        {
            // שליפת המפתח הסודי מה-appsettings.json
            _key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(config["Jwt:Key"]));
        }

        public string CreateToken(User user)
        {
            // 1. הגדרת ה"טענות" (Claims) - המידע שישמר בתוך הטוקן
            var claims = new List<Claim>
        {
            new Claim(JwtRegisteredClaimNames.NameId, user.Id.ToString()),
            new Claim(JwtRegisteredClaimNames.UniqueName, user.Username),
        };

            // 2. יצירת פרטי החתימה (האלגוריתם והמפתח)
            var creds = new SigningCredentials(_key, SecurityAlgorithms.HmacSha512Signature);

            // 3. הגדרת מאפייני הטוקן (תוקף, חתימה וכו')
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(claims),
                Expires = DateTime.Now.AddDays(7), // הטוקן יהיה בתוקף לשבוע
                SigningCredentials = creds
            };

            // 4. יצירת הטוקן בפועל והפיכתו למחרוזת
            var tokenHandler = new JwtSecurityTokenHandler();
            var token = tokenHandler.CreateToken(tokenDescriptor);

            return tokenHandler.WriteToken(token);
        }
    }
}
