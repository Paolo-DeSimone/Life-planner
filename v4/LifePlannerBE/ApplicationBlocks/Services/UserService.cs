using AutoMapper;
using ApplicationBlocks.Models;
using ApplicationBlocks.DTOs;
using ApplicationBlocks.Repositories;
using ApplicationBlocks.Services;

namespace ApplicationBlocks.Services;
public class UserService : UserServiceIn
{
    private readonly UserRepositoryIn _userRepository;
    private readonly IMapper _mapper;

    public UserService(UserRepositoryIn userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserDTO> LoginInUser(string username,string password)
    {
        var user = await _userRepository.LoginInUser(username, password);
        return _mapper.Map<UserDTO>(user);
    }

    public async Task<UserDTO> RegisterUser(UserDTO userDto)
    {
        var user = _mapper.Map<User>(userDto);
        user.Password = BCrypt.Net.BCrypt.HashPassword(user.Password != null ? user.Password : null); // Hash della password
        await _userRepository.RegisterUser(user);
        return _mapper.Map<UserDTO>(user);
    }
}
