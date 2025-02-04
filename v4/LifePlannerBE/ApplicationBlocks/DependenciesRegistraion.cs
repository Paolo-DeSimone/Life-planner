using Microsoft.EntityFrameworkCore;
using ApplicationBlocks.Services;
using ApplicationBlocks.Repositories;

namespace ApplicationBlocks.DependenciesRegistraion;

public static class DependenciesRegistraion
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection Dep)
    {
        Dep.AddScoped<UserService>();
        // Altri servizi...
        return Dep;
    }

    public static IServiceCollection AddApplicationRepositories(this IServiceCollection Dep)
    {
        Dep.AddScoped<UserRepositoryIn, UserRepository>();
        // Altri repository...
        return Dep;
    }


}



