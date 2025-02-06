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

    [HttpPost("create")]
    public async Task<ActionResult<UserDTO>>RegisterUser(UserDTO userDto)
    {
        var user = await _userService.RegisterUser(userDto);
        var userResponse = _mapper.Map<UserDTO>(user);
        return Ok(userResponse);
    }
    
    [HttpGet("get/{email}/{password}")]
    public async Task<ActionResult<UserDTO>> LoginInUser(string email, string password)
    {
        var userDto = await _userService.LoginInUser(email, password);
        if (userDto == null) return NotFound();
        return Ok(userDto);
    }
}
