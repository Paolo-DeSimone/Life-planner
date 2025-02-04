using ApplicationBlocks.Models;
using ApplicationBlocks.Repositories;

namespace ApplicationBlocks.Repositories;

public class UserRepository : UserRepositoryIn
{
    private readonly ApplicationDbContext _context;
    public UserRepository(ApplicationDbContext context)
    {
        _context = context;
    }

    public async Task<User> GetByIdAsync(int id)
    {
        var user = await _context.User.FindAsync(id);
        if (user == null)
        {
            throw new KeyNotFoundException($"User with id {id} not found.");
        }
        return user;
    }

    public async Task AddAsync(User user)
    {
        await _context.User.AddAsync(user);
        await _context.SaveChangesAsync();
    }
    
}