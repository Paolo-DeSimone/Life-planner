using BE.Models;
using BE.Services;

using System; // Per Guid
using System.Threading.Tasks; // Per Task
using Microsoft.AspNetCore.Mvc; // Per ControllerBase
using Microsoft.AspNetCore.Authorization; // Per Authorize

using System.Net; // Per NetworkCredential
using System.Net.Mail;


namespace BE.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly UsersService _userService;
        private readonly LPContext _context;

        public UserController(UsersService userService, LPContext context)
        {
            _userService = userService;
            _context = context;
        }

        // Endpoint per la registrazione utente
        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            var token = Guid.NewGuid().ToString();
            user.TempToken = token;
            await _userService.Register(user);
            await SendVerificationEmail(user);
            return Ok();
        }


        private async Task SendVerificationEmail(User user)
        {
            // Configura il client SMTP (sostituisci i valori con quelli reali)
            var smtpClient = new SmtpClient("smtp.gmail.com")
            {
                Port = 587,
                Credentials = new NetworkCredential("", ""), // Inserisco email e password dell'account Google a cui corrisponde la mail
                EnableSsl = true,
            };

            // Crea il messaggio email
            var mailMessage = new MailMessage
            {
                From = new MailAddress(""), // Inserisco l'email dell'account da cui inviare l'email
                Subject = "Verifica il tuo account al Life Planner",
                Body = $"Clicca sul link per verificare il tuo account: https://www.tuodominio.com/api/verify?token={user.TempToken}",
                IsBodyHtml = true,
            };

            mailMessage.To.Add(user.Email);

            // Invia l'email
            await smtpClient.SendMailAsync(mailMessage);
        }


        // Endpoint per il login utente
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User user)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _userService.Login(user);
            return Ok(result);
        }
    }
}
