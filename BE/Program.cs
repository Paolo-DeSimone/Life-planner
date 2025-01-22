var builder = WebApplication.CreateBuilder(args);


// Aggiungi supporto per HTTPS
builder.Services.AddHttpsRedirection(options =>
{
    options.HttpsPort = 5001;  // Puoi scegliere una porta diversa se necessario
});

// Aggiungi i controller
builder.Services.AddControllers();

var app = builder.Build();
app.UseStaticFiles(); // Abilita l'uso di file statici dentro wwwroot

// Usa HTTPS se in ambiente di sviluppo o produzione
if (app.Environment.IsDevelopment())
{
    app.UseDeveloperExceptionPage();
}
else
{
    app.UseExceptionHandler("/Home/Error");
    app.UseHsts();  // Abilitato solo in produzione
}

app.UseHttpsRedirection();  // Redirige le richieste HTTP verso HTTPS
app.UseStaticFiles();
app.UseRouting();

app.UseEndpoints(endpoints =>
{
    endpoints.MapControllers();
    app.MapGet("/", () => "Welcome to LifePlanner API!");
});


// Mappa i controller
app.MapControllers();

Console.WriteLine($"Ambiente di esecuzione BE: {app.Environment.EnvironmentName}");

app.Run();
