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

    public async Task<UserDTO> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        return _mapper.Map<UserDTO>(user);
    }

    public async Task<User> RegisterUserAsync(UserDTO userDto)
    {
        var user = _mapper.Map<User>(userDto);
        user.Password = HashPassword(user.Password != null ? user.Password : "defaultPassword"); // Hash della password
        await _userRepository.AddAsync(user);
        return user;
    }

    private string HashPassword(string password)
    {
        return BCrypt.Net.BCrypt.HashPassword(password); // Usa bcrypt per la sicurezza
    }
}
