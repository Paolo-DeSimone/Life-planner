using Microsoft.AspNetCore.Mvc;
using Models;

[Route("api/[controller]")]
[ApiController]
public class UserController : BaseController<User>
{
    public UserController(IService<User> userService) : base(userService)
    {
    }

    // Puoi sovrascrivere metodi se necessario.
}
