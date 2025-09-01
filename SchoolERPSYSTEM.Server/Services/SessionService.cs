using SchoolERP.Server.Services;

public class SessionService
{
    private readonly IHttpContextAccessor _httpContextAccessor;

    public SessionService(IHttpContextAccessor httpContextAccessor)
    {
        _httpContextAccessor = httpContextAccessor;
    }

    public void SetSchoolId(string schoolId)
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new InvalidOperationException("HttpContext is not available.");
        }

        // Store the schoolId in session
        httpContext.Session.SetString("SchoolId", schoolId);
    }

    public string GetSchoolId()
    {
        var httpContext = _httpContextAccessor.HttpContext;
        if (httpContext == null)
        {
            throw new InvalidOperationException("HttpContext is not available.");
        }

        // Retrieve the schoolId from session
        return httpContext.Session.GetString("SchoolId");
    }
}
