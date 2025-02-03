using AutoMapper;
using ApplicationBlocks.Models;
using ApplicationBlocks.DTOs;
using ApplicationBlocks.Repositories;

namespace ApplicationBlocks.Services;
public class UserService
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UserService(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    public async Task<UserResponseDTO> GetUserByIdAsync(int id)
    {
        var user = await _userRepository.GetByIdAsync(id);
        return _mapper.Map<UserResponseDTO>(user);
    }

    public async Task<User> RegisterUserAsync(UserRegisterDTO userDto)
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
