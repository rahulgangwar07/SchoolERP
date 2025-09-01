using Azure.Core;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace SchoolERP.Server.Services
{
    public class JwtHelperService
    {
        private readonly IHttpContextAccessor _httpContextAccessor;

        public JwtHelperService(IHttpContextAccessor httpContextAccessor)
        {
            _httpContextAccessor = httpContextAccessor;
        }

        public string GetSchoolIdFromToken(string token)
        {
            var handler = new JwtSecurityTokenHandler();
            var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

            if (jsonToken == null)
            {
                return null; // Token couldn't be parsed
            }

            // Find the schoolId claim in the token
            //var schoolIdClaim = jsonToken?.Claims.FirstOrDefault(c => c.Type == "SchoolId");
            var schoolIdClaim = jsonToken?.Claims
    .Where(c => c.Type == "schoolId") // Filter all SchoolId claims
    .LastOrDefault();

            return schoolIdClaim?.Value;
        }

        public string UpdateSchoolIdToken(string token, string newSchoolId)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var jwtToken = tokenHandler.ReadJwtToken(token);

            // Find the old 'schoolId' claim and replace it with the new one
            var claims = jwtToken.Claims.ToList();
            var schoolIdClaim = claims.FirstOrDefault(c => c.Type == "schoolId");

            // If the claim exists, remove it
            if (schoolIdClaim != null)
            {
                claims.Remove(schoolIdClaim);
            }

            // Add the new 'schoolId' claim
            claims.Add(new Claim("schoolId", newSchoolId));

            // Define your secret key (this should ideally be stored securely in a config or secrets store)
            var secretKey = "ThisIsMyVerySecretKey12345!ThisIsMyVerySecretKey"; // Secure this key in production

            // Create the new JWT token with updated claims
            var newToken = new JwtSecurityToken(
                issuer: "YourIssuer", // Your issuer here (can be your API or a domain)
                audience: "YourAudience", // Your audience here
                claims: claims, // Updated claims
                expires: DateTime.Now.AddHours(1), // Set token expiration (adjust as necessary)
                signingCredentials: new SigningCredentials(
                    new SymmetricSecurityKey(Encoding.UTF8.GetBytes(secretKey)),
                    SecurityAlgorithms.HmacSha256)
            );

            // Return the new token as a string
            return tokenHandler.WriteToken(newToken);
        }


        //public string UpdateSchoolIdToken(string token, string newSchoolId)
        //{
        //    if (string.IsNullOrEmpty(token))
        //    {
        //        return "Token is missing";
        //    }

        //    var handler = new JwtSecurityTokenHandler();
        //    var jsonToken = handler.ReadToken(token) as JwtSecurityToken;

        //    if (jsonToken == null)
        //    {
        //        return "Invalid token";
        //    }

        //    // Extract all claims from the token
        //    var claims = jsonToken.Claims.ToList();

        //    // Remove the old 'SchoolId' claim (if it exists)
        //    var updatedClaims = claims.Where(c => c.Type != "SchoolId").ToList();

        //    // Add the new 'SchoolId' claim
        //    updatedClaims.Add(new Claim("SchoolId", newSchoolId));

        //    // Create a new JWT token with updated claims
        //    var newToken = new JwtSecurityToken(
        //        issuer: "YourIssuer",
        //        audience: "YourAudience",
        //        claims: updatedClaims,
        //        expires: DateTime.Now.AddHours(1),
        //        signingCredentials: new SigningCredentials(
        //            new SymmetricSecurityKey(Encoding.UTF8.GetBytes("ThisIsMyVerySecretKey12345!ThisIsMyVerySecretKey")),
        //            SecurityAlgorithms.HmacSha256)
        //    );

        //    // Generate the new token string
        //    var newTokenString = new JwtSecurityTokenHandler().WriteToken(newToken);

        //    return newTokenString;
        //}

    }
}
