
using ApplicationBlocks.DTOs;
using ApplicationBlocks.Models;

namespace ApplicationBlocks.Services;
public interface UserServiceIn
{
    Task<UserDTO> GetUserByIdAsync(int id);
    Task<User> RegisterUserAsync(UserDTO userDto);
}