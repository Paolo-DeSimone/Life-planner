using BE.Repositories;
using BE.Models;

namespace BE.Services
{
    public class UsersService
    {
        private readonly UsersRepo _usersRepo;

        public UsersService(UsersRepo usersRepo)
        {
            _usersRepo = usersRepo;
        }

        public async Task<User> Register(User user)
        {
            return await _usersRepo.Register(user);
        }

        public async Task<User> VerifyUser(User user, string token)
        {  
            return await _usersRepo.VerifyUser(user, token);
        }

        public async Task<User> FindUserByToken(string token)
        {
            return await _usersRepo.FindUserByToken(token);
        }

        public async Task<User> Login(User user)
        {
            return await _usersRepo.Login(user);
        }
    }
}