using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;

namespace SchoolERP.Server.Services
{
    public class EmailService
    { 
        private readonly string _smtpServer = "smtp.gmail.com";  
        private readonly int _smtpPort = 587;  
        private readonly string _smtpUser = "aksdotnet@gmail.com";  
        private readonly string _smtpAppKey = "wewybvekpnovdqwe";  

        public async Task SendAsync(string toEmail, string subject, string body)
        {
            var client = new SmtpClient(_smtpServer)
            {
                Port = _smtpPort,
                Credentials = new NetworkCredential(_smtpUser, _smtpAppKey),         
                EnableSsl = true
            };

            var mailMessage = new MailMessage
            {
                From = new MailAddress(_smtpUser),
                Subject = subject,
                Body = body,
                IsBodyHtml = true
            };

            mailMessage.To.Add(toEmail); 
            await client.SendMailAsync(mailMessage);
        }
    }
}
