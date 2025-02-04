using ApplicationBlocks.Services;
using ApplicationBlocks.Repositories;

namespace ApplicationBlocks.Utilites;

public static class DependenciesRegistraion
{
    public static IServiceCollection AddApplicationServices(this IServiceCollection Dep)
    {
        Dep.AddScoped<UserService>();
        // Altri servizi...
        return Dep;
    }

    public static IServiceCollection AddRepositories(this IServiceCollection Dep)
    {
        Dep.AddScoped<UserRepositoryIn, UserRepository>();
        // Altri repository...
        return Dep;
    }
}



