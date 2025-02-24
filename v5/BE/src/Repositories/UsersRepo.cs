using BE.Models;

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


        public async Task<User> Login(User user)
        {
            // Login user
            return await Task.FromResult(user);
        }
    }
}