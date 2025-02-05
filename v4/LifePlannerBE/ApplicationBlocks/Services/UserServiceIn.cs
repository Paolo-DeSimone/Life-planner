
using ApplicationBlocks.DTOs;
using ApplicationBlocks.Models;

namespace ApplicationBlocks.Services;
public interface UserServiceIn
{
    Task<UserDTO> LoginInUser(string username,string password);
    Task<UserDTO> RegisterUser(UserDTO userDto);
}