using ApplicationBlocks;
using ApplicationBlocks.Repositories;
using ApplicationBlocks.DependenciesRegistraion;


using Microsoft.EntityFrameworkCore;


var builder = WebApplication.CreateBuilder(args);

// asp.net core services
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();

// my services
builder.Services.AddApplicationServices();  
builder.Services.AddApplicationRepositories(); // forse è inefficiente perché non è scoped 

// AutoMapper
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly); // forse è inefficiente perché non è scoped

// SQL Server connection. AddDbContext regitra il servizio come scoped in automatico
string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

builder.WebHost.ConfigureKestrel(options =>
{
    options.ListenAnyIP(5088); // Porta HTTP
    options.ListenAnyIP(7211, listenOptions => listenOptions.UseHttps());
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/", () => "Le API di Life Planner funzionano! Aggiungi '/swagger' alla URL per testarle!.");


app.UseHttpsRedirection();
app.MapControllers();
app.Run();