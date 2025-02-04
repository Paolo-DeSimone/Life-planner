using ApplicationBlocks.Models;

namespace ApplicationBlocks.Repositories;
public interface UserRepositoryIn
{
    Task<User> GetByIdAsync(int id);
    Task AddAsync(User user);
}