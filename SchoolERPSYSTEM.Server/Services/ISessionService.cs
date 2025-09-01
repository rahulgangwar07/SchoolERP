namespace SchoolERP.Server.Services
{
    public interface ISessionService
    {
        string GetSchoolId();
        void SetSchoolId(string schoolId);
    }
}
