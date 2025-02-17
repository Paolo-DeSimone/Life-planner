using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace Models
{
    public class LifePlannerContext : DbContext
    {
        public DbSet<Users> Users { get; set; }
        public DbSet<Objectives> Objectives { get; set; }
        public DbSet<Expenses> Expenses { get; set; }

    }

    public class Users
    {
        /// <summary>
        /// Gets or sets the unique identifier for the user.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// Gets or sets the user's email address.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Gets or sets the user's password.
        /// </summary>
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
        public int TMIperc = 100;

        /// <summary>
        /// Gets or sets the objective monthly budget percentage.
        /// This value is always set by the user.
        /// </summary>
        public int OMBperc { get; set; }

        /// <summary>
        /// Gets or sets the expenses monthly budget percentage.
        /// Always calculated as TMIperc - OMBperc.
        /// </summary>
        public int EMBperc { get; set; }

        /// <summary>
        /// Gets or sets the emergency fund.
        /// This value is not tracked like standard income/expenses and can be positive or negative.
        /// Example: A gift or an unforeseen medical expense.
        /// </summary>
        public int EMEfund { get; set; }
    }

    public class Objectives
    {
        /// <summary>
        /// Gets or sets the unique identifier for the objective.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The user's email address. In Objectives is FK of Users.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// Objective's description.
        /// </summary>
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
        public int OBJtarget { get; set; }

        /// <summary>
        /// When User forecasts to collect all money of OBJtarget. The value is expressed in months because this is the unit measure used in the program.
        /// </summary>
        public int OBJExpiry { get; set; }

        /// <summary>
        /// The money that user wants to save each month for one OBJ. This value increases OBJsaved by a manual only used command. The sum of all OMBassigned = OMBtot in Users table. OMBtot - all the OMBassigned = OMBleft.
        /// </summary>
        public int OMBassigned { get; set; }

        /// <summary>
        /// The actual money that user saved for an OBJ. While OBJtarget is the amount he just plans to save. It is increased with the value of OMBassigned.
        /// </summary>
        public int OMBsaved { get; set; }

        /// <summary>
        /// It is the amount of OMBtot in Users table that it is not been still turned into OMBassigned.
        /// </summary>
        public int OMBleft { get; set; }

        /// <summary>
        /// It is the amount of EMBtot in Users table that it is not been still used to pay an expence.
        /// </summary>
        public int EMBleft { get; set; }

    }

    public class Expenses
    {
        /// <summary>
        /// Gets or sets the unique identifier for an expance.
        /// </summary>
        public int Id { get; set; }

        /// <summary>
        /// The user's email address. In Objectives is FK of Users.
        /// </summary>
        public string Email { get; set; }

        /// <summary>
        /// The expance amount.
        /// </summary>
        public int Amount { get; set; }

        /// <summary>
        /// The category of the expance. Examples: Restaurans, Clothes, Videogames...
        /// </summary>
        public string Category { get; set; }
    }
}
