using BE.Models;
using BE.Services;

using System; // Per Guid
using System.Threading.Tasks; // Per Task
using Microsoft.AspNetCore.Mvc; // Per ControllerBase
using Microsoft.AspNetCore.Authorization; // Per Authorize

using System.Net; // Per NetworkCredential
using System.Net.Mail;
using Microsoft.AspNetCore.Identity;


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
            user.IsVerified = false;
            await _userService.Register(user);
            await _userService.SendVerificationEmail(user);
            return Ok();
        }



        [HttpGet("verify")]
        public async Task<IActionResult> VerifyUser(string token)
        {
            if (string.IsNullOrEmpty(token))
            {
                return BadRequest("Token non fornito.");
            }
            var user = await _userService.FindUserByToken(token);
            if (user == null)
            {
                return NotFound("Utente non trovato.");
            }
            await _userService.VerifyUser(user, token);
            return Redirect("http://localhost:4200");
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
