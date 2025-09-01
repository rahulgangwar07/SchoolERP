using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Threading.Tasks;

namespace SchoolERP.Server.Services
{
    public class UserService
    {
        private readonly EmailService _emailService;

        public UserService(EmailService emailService)
        {
            _emailService = emailService;
        }

        public async Task<bool> CreateAndSendUserCredentials(string userEmail, string UserId, string userPassword)
        {
            try
            {
                string link = "https://localhost:4200/";

                string subject = "Your Account Details";
                string body = $@"
                <h2>Welcome to Our School ERP</h2>
                <p>Your account has been created successfully. Below are your login details:</p>
                <p><strong>User ID:</strong> {UserId}</p>
                <p><strong>User Email:</strong> {userEmail}</p>               
                <p><strong>Password:</strong> {userPassword}</p> 
                <p><strong>Link for Login:</strong> {link}</p>
                <p>Please log in and change your password as soon as possible.</p>";

                await _emailService.SendAsync(userEmail, subject, body);
                return true; // Email sent successfully
            }
            catch (Exception)
            {
                return false; // Return false in case of error
            }
        }
        public async Task<bool> SendOTPCredentials(string userEmail, string OTP)
        {
            try
            {
                string link = "https://localhost:4200/";

                string subject = "Your Account Details";
                string body = $@"
                <h2>Welcome to Our School ERP</h2>
                <p>Your account has been created successfully. Below are your login details:</p> 
                <p><strong>User Email:</strong> {userEmail}</p>               
                <p><strong>OTP:</strong> {OTP}</p> 
                <p><strong>Link for Login:</strong> {link}</p>
                <p>Please Verify this OTP.</p>";

                await _emailService.SendAsync(userEmail, subject, body);
                return true; // Email sent successfully
            }
            catch (Exception)
            {
                return false; // Return false in case of error
            }
        }
    }
}

