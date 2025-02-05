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

    [HttpGet("get/{username}/{password}")]
    public async Task<ActionResult<UserDTO>> LoginInUser(string username, string password)
    {
        var userDto = await _userService.LoginInUser(username, password);
        if (userDto == null) return NotFound();
        return Ok(userDto);
    }

    [HttpPost("create")]
    public async Task<ActionResult<UserDTO>> RegisterUser(UserDTO userDto)
    {
        var user = await _userService.RegisterUser(userDto);
        var userResponse = _mapper.Map<UserDTO>(user);
        return Ok(userResponse);
    }

}
