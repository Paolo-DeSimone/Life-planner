using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

using System.ComponentModel.DataAnnotations;

namespace Models
{
    public class LifePlannerContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Objectives> Objectives { get; set; }
        public DbSet<Expenses> Expenses { get; set; }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Objectives>()
                .HasOne(o => o.User)
                .WithMany(u => u.Objectives)
                .HasForeignKey(o => o.UserId);

            modelBuilder.Entity<Expenses>()
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
    public class Users
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
        public List<Objectives> Objectives { get; set; } = new List<Objectives>();
        public List<Expenses> Expenses { get; set; } = new List<Expenses>();
    }

    public class Objectives
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

        public Users User { get; set; }



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

    public class Expenses
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

        public Users User { get; set; }

    }
}
