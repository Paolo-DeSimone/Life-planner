using BE.Models;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.EntityFrameworkCore;

namespace BE.Repositories
{
    public class UsersRepo
    {
        private readonly LPContext _dbContext;
        public UsersRepo(LPContext dbContext)
        {
            _dbContext = dbContext;
        }
        public async Task<User> Register(User user)
        {
            _dbContext.Users.Add(user);  // Aggiunge l'utente al contesto
            await _dbContext.SaveChangesAsync();  // Salva i cambiamenti nel DB
            return user;
        }

        public async Task<User> VerifyUser(User user, string token)
        {
            // Ho già verificato che lo user esiste ed il token è valido con FindUserByToken
            // user = await _dbContext.Users.FirstOrDefaultAsync(u => u.TempToken == token);
            // if (user == null)
            // {
            //     return null;
            // }

            // Aggiorna lo stato dell'utente
            user.IsVerified = true;
            user.TempToken = null; // Puoi resettare il token se non ti serve più
            _dbContext.Users.Update(user);
            await _dbContext.SaveChangesAsync();
            return user;
        }

        public async Task<User> FindUserByToken(string token)
        {
            var result = await _dbContext.Users.FirstOrDefaultAsync(u => u.TempToken == token);
            if (result == null)
            {
                return null;
            }
            return result;
        }





        public async Task<User> Login(User user)
        {
            // Login user
            return await Task.FromResult(user);
        }
    }
}