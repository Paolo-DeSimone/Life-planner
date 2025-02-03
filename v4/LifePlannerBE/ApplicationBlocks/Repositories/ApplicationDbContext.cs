using Microsoft.EntityFrameworkCore;
using ApplicationBlocks.Models;

namespace ApplicationBlocks.Repositories {
    public class ApplicationDbContext : DbContext{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){
        }

        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
        }

        public DbSet<User> User { get; set; } 

    }

}