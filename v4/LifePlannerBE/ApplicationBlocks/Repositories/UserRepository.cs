using Microsoft.EntityFrameworkCore;

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

    public async Task<User> LoginInUser(string username, string password)
    {
        var user = await _context.User.FirstOrDefaultAsync(u => u.Email == username);
        if (user == null || !BCrypt.Net.BCrypt.Verify(password, user.Password))
        {
            throw new KeyNotFoundException("User not found.");
        }
        return user;
    }


    public async Task RegisterUser(User user)
    {
        await _context.User.AddAsync(user);
        await _context.SaveChangesAsync();
    }

}