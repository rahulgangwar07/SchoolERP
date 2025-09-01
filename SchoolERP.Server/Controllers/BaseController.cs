using Microsoft.AspNetCore.Mvc;
using SchoolERP.Server.Services;

namespace SchoolERP.Server.Controllers
{
    public class BaseController : ControllerBase
    {
        private readonly JwtHelperService _jwtHelperService;

        public BaseController(JwtHelperService jwtHelperService)
        {
            _jwtHelperService = jwtHelperService;
        }

        protected bool TryExtractSchoolIdFromToken(out string schoolId)
        {
            var token = Request.Headers["Authorization"].ToString().Replace("Bearer ", "").Trim();

            if (string.IsNullOrEmpty(token))
            {
                schoolId = null;
                return false;
            }

            schoolId = _jwtHelperService.GetSchoolIdFromToken(token);
            return !string.IsNullOrEmpty(schoolId);
        }
    }
}
