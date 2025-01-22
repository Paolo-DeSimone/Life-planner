// controllers/apiTest.cs
using Microsoft.AspNetCore.Mvc;

[Route("api/[controller]")]
[ApiController]
public class HomeController : ControllerBase
{
    [HttpGet("getall")] 
    public IActionResult Get()
    {
        return Ok("LifePlanner API is running!");
    }
}
