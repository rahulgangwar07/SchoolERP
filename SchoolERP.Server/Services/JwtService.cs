using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolERP.Server.Services
{
    public class JwtService
    {
        private readonly string _secretKey;
        private readonly string _issuer;
        private readonly string _audience;

        public JwtService(string secretKey, string issuer, string audience)
        {
            _secretKey = secretKey;
            _issuer = issuer;
            _audience = audience;
        }

        public string GenerateJwtToken(string session, string schoolId)
        {
            var claims = new List<Claim>
            {
                new Claim("Session", session),  // Add Session claim
                new Claim("SchoolId", schoolId) // Add SchoolId claim here
            };

            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsMyVerySecretKey12345!ThisIsMyVerySecretKey"));
            var credentials = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

            var token = new JwtSecurityToken(
                issuer: _issuer,
                audience: _audience,
                claims: claims,
                expires: DateTime.Now.AddHours(1),
                signingCredentials: credentials
            );

            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
