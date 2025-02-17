using ApplicationBlocks.Models;

namespace ApplicationBlocks.Repositories;
public interface UserRepositoryIn
{
    Task<User> LoginInUser(string username,string password);
    Task RegisterUser(User user);
}