
using ApplicationBlocks.DTOs;
using ApplicationBlocks.Models;

namespace ApplicationBlocks.Services;
public interface IUserService
{
    Task<UserResponseDTO> GetUserByIdAsync(int id);
    Task<User> RegisterUserAsync(UserRegisterDTO userDto);
}