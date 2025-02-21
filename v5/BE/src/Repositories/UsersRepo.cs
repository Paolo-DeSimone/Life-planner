using BE.Models;

namespace Repositories{
    public class UsersRepo{
        public async Task<User> Register(User user){
            // Register user
            return await Task.FromResult(user);
        }

        public async Task<User> Login(User user){
            // Login user
            return await Task.FromResult(user);
        }
    }
}