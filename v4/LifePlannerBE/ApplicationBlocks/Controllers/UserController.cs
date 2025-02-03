using Microsoft.AspNetCore.Mvc;

using ApplicationBlocks.Services;
using ApplicationBlocks.DTOs;

using AutoMapper;

namespace ApplicationBlocks.Controllers;
[ApiController]
[Route("api/users")]
public class UserController : ControllerBase
{
    private readonly UserService _userService;
    private readonly IMapper _mapper;

    public UserController(UserService userService, IMapper mapper)
    {
        _userService = userService;
        _mapper = mapper;
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<UserResponseDTO>> GetUser(int id)
    {
        var userDto = await _userService.GetUserByIdAsync(id);
        if (userDto == null) return NotFound();
        return Ok(userDto);
    }

    [HttpPost("register")]
    public async Task<ActionResult<UserResponseDTO>> Register(UserRegisterDTO userDto)
    {
        var user = await _userService.RegisterUserAsync(userDto);
        var userResponse = _mapper.Map<UserResponseDTO>(user);
        return Ok(userResponse);
    }
}
