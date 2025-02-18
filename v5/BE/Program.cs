using System.IO;
using Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container. Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("BEconfigs/appsettings.json", optional: false, reloadOnChange: true);

// Setting the DB connection. Note: connection string is defined in BEconfigs/appsettings.json
string SQLServerConn = builder.Configuration.GetConnectionString("SQLServerConn");
builder.Services.AddDbContext<LPContext>(options => options.UseSqlServer(SQLServerConn));


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.MapGet("", () =>
{

})
.WithName("test")
.WithOpenApi();

Console.WriteLine("FUNZIONA");

app.Run();
