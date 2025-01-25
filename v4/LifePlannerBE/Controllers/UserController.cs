using Microsoft.AspNetCore.Mvc;
using Models;

[Route("api/[controller]")]
[ApiController]
public class UserController : UserModel
{
    [HttpGet("getall")] 
    public IActionResult Get()
    {
        return Ok("LifePlanner API is running!");
    }
}
