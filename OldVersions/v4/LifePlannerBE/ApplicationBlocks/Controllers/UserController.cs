using Microsoft.AspNetCore.Mvc;

using ApplicationBlocks.Services;
using ApplicationBlocks.DTOs;

using AutoMapper;

namespace ApplicationBlocks.Controllers;
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserServiceIn _userService;
    private readonly IMapper _mapper;

    public UserController(UserServiceIn userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet("create/{email}/{password}")] // non corretto usare un get perché dovrebbe essere un post ma va bene lo stesso per ora...
    public async Task<ActionResult<UserDTO>> RegisterUser(string email, string password)
    {
        var userDto = new UserDTO { Email = email, Password = password };
        var newUser = await _userService.RegisterUser(userDto);
        return Ok(newUser);
    }



    [HttpGet("get/{email}/{password}")]
    public async Task<ActionResult<UserDTO>> LoginInUser(string email, string password)
    {
        var userDto = await _userService.LoginInUser(email, password);
        if (userDto == null) return NotFound();
        return Ok(userDto);
    }
}
