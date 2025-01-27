using System.Data;
using System.Threading.Tasks;
using Dapper;

public class BaseService<T>
{
    private readonly IDbConnection _connection;

    public BaseService(IDbConnection connection)
    {
        _connection = connection;
    }

public async Task<int> Create(string tableName, T payload)
{
    // Converti il payload in un DTO
    var dto = await MapToDtoAsync(tableName, payload);

    // Costruisci dinamicamente la query
    var query = $"INSERT INTO {tableName} ({string.Join(", ", dto.GetType().GetProperties().Select(p => p.Name))}) " +
                $"VALUES ({string.Join(", ", dto.GetType().GetProperties().Select(p => $"@{p.Name}"))})";

    // Esegui la query
    return await _connection.ExecuteAsync(query, dto);
}


    // Metodi simili per Read, Update, Delete
}
