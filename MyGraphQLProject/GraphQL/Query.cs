using HotChocolate;
using System.Collections.Generic;
using Dapper;
using MyGraphQLProject;
using Microsoft.Data.SqlClient;

namespace MyGraphQLProject
{
public class Query
{
    private readonly DapperContext _context;

    public Query(DapperContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<Users>> GetUsers()
    {
        using (var connection = _context.CreateConnection())
        {
            var sql = "SELECT * FROM Users";
            var result = await connection.QueryAsync<Users>(sql);
            return result;
        }
    }
    public async Task<Users?> GetUserByIdAsync(int id)
    {
        using (var connection = _context.CreateConnection())
        {
            var sql = "SELECT * FROM Users WHERE id = @id";
            var user = await connection.QuerySingleOrDefaultAsync<Users>(sql, new { id = id });
            return user;
        }
    }

}
}