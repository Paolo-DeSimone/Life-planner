using System.IO;
using BE.Models;
using BE.Controllers;
using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// Aggiungi i servizi per Swagger/OpenAPI
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddControllers();

// Carica la configurazione da BEconfigs/appsettings.json
builder.Configuration.SetBasePath(Directory.GetCurrentDirectory())
    .AddJsonFile("BEconfigs/appsettings.json", optional: false, reloadOnChange: true);

// Configura la connessione al database (la stringa è definita in BEconfigs/appsettings.json)
string SQLServerConn = builder.Configuration.GetConnectionString("SQLServerConn");
builder.Services.AddDbContext<LPContext>(options => options.UseSqlServer(SQLServerConn));


var app = builder.Build();

// Configura il middleware HTTP
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI(options =>
    {
        options.SwaggerEndpoint("/swagger/v1/swagger.json", "v1");
        options.RoutePrefix = string.Empty; // Imposta la root come swagger
    });
}

app.UseHttpsRedirection();

app.MapControllers();

app.Run();
