using ApplicationBlocks.Services; 
using ApplicationBlocks.Repositories;
using Microsoft.EntityFrameworkCore;
using ApplicationBlocks;


var builder = WebApplication.CreateBuilder(args);

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddControllers();
builder.Services.AddAutoMapper(typeof(MappingProfile).Assembly); // forse è inefficiente perché non è scoped
builder.Services.AddScoped<UserRepositoryIn, UserRepository>();
builder.Services.AddScoped<UserService>();



//SQL Server connection.  AddDbContext regitra il servizio come scoped in automatico
string? connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<ApplicationDbContext>(options => options.UseSqlServer(connectionString));

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.MapControllers();
app.Run();