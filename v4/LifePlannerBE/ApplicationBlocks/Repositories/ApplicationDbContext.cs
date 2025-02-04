using Microsoft.EntityFrameworkCore;
using ApplicationBlocks.Models;

namespace ApplicationBlocks.Repositories {
    public class ApplicationDbContext : DbContext{
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options){
        }

        /// <summary>
        /// This method is used to configure the database schema.
        /// Example: set the primary key, set the foreign key, set the table name, etc.
        /// </summary>
        /// <param name="builder"></param>
        protected override void OnModelCreating(ModelBuilder builder){
            base.OnModelCreating(builder);
        }

        public DbSet<User> User { get; set; } 

    }

}