using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using Dapper;

public class DBConnectionService : ModelsDTO
{
    private readonly string _connectionString;

    public DBConnectionService(string connectionString)
    {
        _connectionString = connectionString ?? throw new ArgumentNullException(nameof(connectionString));
    }

    // Crea una connessione al database
    public IDbConnection CreateConnection()
    {
        return new System.Data.SqlClient.SqlConnection(_connectionString);
    }

    // Metodo asincrono per eseguire una query e mappare i risultati su un DTO
    public async ModelsDTO.DTO<T> MapToDtoAsync(string tableDTO, object payload = null)
    {
        return DTOFromPayload = payload.map(tableDTO) 
    }

}
