using BE.Repositories;
using BE.Models;

using System.Net; // Per NetworkCredential
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;

namespace BE.Services
{
    public class UsersService
    {
        private readonly UsersRepo _usersRepo;

        public UsersService(UsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        public async Task<User> Register(User user)
        {
            return await _usersRepo.Register(user);
        }

        public async Task<User> VerifyUser(User user, string token)
        {
            return await _usersRepo.VerifyUser(user, token);
        }

        public async Task SendVerificationEmail(User user)
        {
            // Configura il client SMTP (sostituisci i valori con quelli reali)
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("codingtestspaolo@gmail.com", "ahux elop rxch lbqh"), // la password è una "password per le app" di Google
                EnableSsl = true,
            };

            // Crea il messaggio email
            var mailMessage = new MailMessage
            {
                From = new MailAddress("codingtestspaolo@gmail.com"), // Inserisco l'email dell'account da cui inviare l'email
                Subject = "Verifica il tuo account al Life Planner",
                Body = $"Clicca sul link per verificare il tuo account: https://localhost:7092/api/User/verify?token={user.TempToken}",
                IsBodyHtml = true,
            };

            mailMessage.To.Add(user.Email);

            // Invia l'email
            await smtpClient.SendMailAsync(mailMessage);
        }

        public async Task<User> FindUserByToken(string token)
        {
            return await _usersRepo.FindUserByToken(token);
        }

        public async Task<User> Login(User user)
        {
            return await _usersRepo.Login(user);
        }
    }
}