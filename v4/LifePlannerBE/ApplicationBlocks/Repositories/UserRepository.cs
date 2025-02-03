using ApplicationBlocks.Models;

namespace ApplicationBlocks.Repositories;
public interface IUserRepository
{
    Task<User> GetByIdAsync(int id);
    Task AddAsync(User user);
}