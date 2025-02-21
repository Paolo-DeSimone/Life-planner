using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using System.ComponentModel.DataAnnotations;

namespace BE.Models
{
    /// <summary>
    /// LPContext represents a singole session with my DB. A session is an HTTP call.
    /// Here are defined Db tables, properties and relationships using Entity Framework (EF).
    /// Connection to database in provided in Program.cs and configured in the constructor of this class.
    /// </summary>
    public class LPContext : DbContext
    {
        public LPContext(DbContextOptions<LPContext> DBConnection) : base(DBConnection) { }
        public DbSet<User> Users { get; set; }
        public DbSet<Objective> Objectives { get; set; }
        public DbSet<Expense> Expenses { get; set; }

        /// <summary>
        /// Here relationships between tables are defined.
        /// </summary>
        /// <param name="modelBuilder"></param>
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            /** 1 OBJ is linked to only 1 User, but 1 user can have many OBJ.
            Note: .HasOne defines a relationship with Users table. This is the reason why .WithMany can access u.Objectives, which is Users.Objectives.
            In EF, defining a relationship from table A to B, but not explicitly doing the reverse, it is called "reverse navigation" or "reverse relationship"
            
            Let's say I need to define more relationships with other tables, like Objectives and Categories. 
            To do it, I have to write a new "modelBuilder.Entity<Objectives>()" with the entities I want. I can not define all togheter.
            **/
            modelBuilder.Entity<Objective>()
                .HasOne(o => o.User)
                .WithMany(u => u.Objectives)
                .HasForeignKey(o => o.UserId);
            // Expences refers to 1 User only, but he can have multiple expences. 
            modelBuilder.Entity<Expense>()
                        .HasOne(e => e.User)
                        .WithMany(u => u.Expenses)
                        .HasForeignKey(e => e.UserId);
        }

    }

    /// <summary>
    /// Attributo di validazione per verificare le relazioni tra i campi della classe Users.
    /// </summary>
    //     [AttributeUsage(AttributeTargets.Class, AllowMultiple = false)]
    //     public class ValidateUserRelationshipsAttribute : ValidationAttribute
    //     {
    //         protected override ValidationResult IsValid(object value, ValidationContext validationContext)
    //         {
    //             var user = value as Users;
    //             if (user == null)
    //             {
    //                 return new ValidationResult("Oggetto non valido per la validazione.");
    //             }

    //             var errors = new List<string>();

    //             // Verifica che TMIperc = OMBperc + EMBperc.
    //             if (user.TMIperc != user.OMBperc + user.EMBperc)
    //             {
    //                 errors.Add($"TMIperc ({user.TMIperc}) deve essere uguale a OMBperc ({user.OMBperc}) + EMBperc ({user.EMBperc}).");
    //             }

    //             // Verifica che TMItot = OMBtot + EMBtot.
    //             if (user.TMItot != user.OMBtot + user.EMBtot)
    //             {
    //                 errors.Add($"TMItot ({user.TMItot}) deve essere uguale a OMBtot ({user.OMBtot}) + EMBtot ({user.EMBtot}).");
    //             }


    //             if (errors.Any())
    //             {
    //                 return new ValidationResult(string.Join(" ", errors));
    //             }

    //             return ValidationResult.Success;
    //         }
    //     }
    // }

    // [Models.ValidateUserRelationships]
    public class User
    {
        // public Users()
        // {
        //     TMIperc = 100;
        //     OMBperc = 60;
        //     EMBperc = 40;

        //     TMItot = 1500;
        //     OMBtot = (TMItot * OMBperc) / 100;
        //     EMBtot = TMItot - OMBtot;
        // }

        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the user's email address.
        /// </summary>
        [Required]
        [MaxLength(100)]
        [EmailAddress]
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the user's password, which is always saved hashed for security.
        /// </summary>
        [Required]
        public string Pwd { get; set; }

        /// <summary>
        /// Gets or sets a temporary token, used during registration or password reset.
        /// </summary>
        public string TempToken { get; set; }

        /// <summary>
        /// Gets or sets a value indicating whether the user is verified (true if TempToken has been validated).
        /// </summary>
        public bool IsVerified { get; set; }

        /// <summary>
        /// Gets or sets the total monthly income. 
        /// TMItot = OMBtot + EMBtot. Example: Salary.
        /// </summary>
        [Required]
        [Range(0, int.MaxValue)]
        public int TMItot { get; set; }

        /// <summary>
        /// Gets or sets the total objective monthly budget. 
        /// Example: Saving for a house.
        /// </summary>
        public int OMBtot { get; set; }

        /// <summary>
        /// Gets or sets the total monthly expenses budget. 
        /// Example: Dining out.
        /// </summary>
        public int EMBtot { get; set; }

        /// <summary>
        /// Gets or sets the TMI percentage which is always 100.
        /// </summary>
        public int TMIperc { get; } = 100;

        /// <summary>
        /// Gets or sets the objective monthly budget percentage.
        /// This value is always set by the user.
        /// </summary>
        [Required]
        public int OMBperc { get; set; } = 60;

        /// <summary>
        /// Gets or sets the expenses monthly budget percentage.
        /// Always calculated as TMIperc - OMBperc.
        /// </summary>
        public int EMBperc { get; set; } = 40;

        /// <summary>
        /// Gets or sets the emergency fund.
        /// This value tracks non standard income/expenses, meaning anything that is not included in TMI = OMB + EMB, so it can be positive or negative.
        /// Example: A gift or an unforeseen medical expense.
        /// </summary>
        [Range(-240000, 240000)]
        public int EMEfund { get; set; }

        // Navigation properties
        public List<Objective> Objectives { get; set; } = new List<Objective>();
        public List<Expense> Expenses { get; set; } = new List<Expense>();
    }

    public class Objective
    {
        /// <summary>
        /// Gets or sets the unique identifier for the objective.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The user's Id. In Objectives is FK of Users.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// Objective's description.
        /// </summary>
        [MaxLength(255)]
        public string Des { get; set; }

        /// <summary>
        /// If an objective is freezed, user can do anything but increasing the OMBsaved using the OMBassigned.
        /// </summary>
        public bool IsFreezed { get; set; }

        /// <summary>
        /// If an objective is deleted, OMBsaved will be set to 0 if IsCompleted = true. Otherwise It will increase the value od EMEfund in Users table.
        /// </summary>
        /// 
        public bool IsDeleted { get; set; }

        /// <summary>
        /// If an objective is completed, OBJtarget has been reached, meaning OBJtarget = OMBsaved.
        /// </summary>
        public bool IsCompleted { get; set; }


        /// <summary>
        /// The amount of money the objective should collect before being marked as completed. Ex: if the OBJ is buying a car and it costs 10 K euros, that's its OBJtarget.
        /// </summary>
        [Required]
        [Range(0, int.MaxValue)]
        public int OBJtarget { get; set; }

        /// <summary>
        /// When User forecasts to collect all money of OBJtarget. The value is expressed in months because this is the unit measure used in the program.
        /// </summary>
        [Required]
        public int OBJexpiry { get; set; }

        /// <summary>
        /// The money that user wants to save each month for one OBJ. This value increases OBJsaved by a manual only used command. The sum of all OMBassigned = OMBtot in Users table. OMBtot - all the OMBassigned = OMBleft.
        /// </summary>
        [Required]
        public int OMBassigned { get; set; }

        /// <summary>
        /// The actual money that user saved for an OBJ. While OBJtarget is the amount he just plans to save. It is increased with the value of OMBassigned.
        /// </summary>
        public int OMBsaved { get; set; }

        public User User { get; set; }



        // OMBleft AND EMBleft ARE COMMENTED BECAUSE IT IS A CALCULATED FIELD.
        // STILL I WANT PEOPLE TO KNOW OF THEIR EXISTAINCE WHILE READING THIS PAGE WITH ALL THE MODELS,
        // SINCE THESE ARE KEY FIELDS FOR THE PROGRAM TO WORK AS PLANNED
        //
        /// <summary>
        /// It is the amount of OMBtot in Users table that it is not been still turned into OMBassigned.
        /// </summary>
        // public int OMBleft { get; set; }

        /// <summary>
        /// It is the amount of EMBtot in Users table that it is not been still used to pay an expence.
        /// </summary>
        // public int EMBleft { get; set; }

    }

    public class Expense
    {
        /// <summary>
        /// Gets or sets the unique identifier for an expance.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The user's Id. In Expences is FK of Users.
        /// </summary>
        public int UserId { get; set; }

        /// <summary>
        /// The expance amount.
        /// </summary>
        [Required]
        public int Amount { get; set; }

        /// <summary>
        /// The category of the expance. Examples: Restaurans, Clothes, Videogames...
        /// </summary>
        [MaxLength(50)]
        public string Category { get; set; }

        public User User { get; set; }

    }

    public class EmailVerificationToken
    {
        public Guid Id { get; set; }
        public Guid UserId { get; set; }
        public string Token { get; set; }
        public DateTime ExpiryDate { get; set; }
    }
    
}
