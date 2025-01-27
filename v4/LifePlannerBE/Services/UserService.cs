public class UserService : BaseService<User>
{
    public UserService(string connectionString) : base(connectionString) { }

    public void AddUser(User user)
    {
        var query = "INSERT INTO Users (Name, Email) VALUES (@Name, @Email)";
        Create(user, query);
    }

    public IEnumerable<User> GetAllUsers()
    {
        var query = "SELECT * FROM Users";
        return Read(query);
    }

    public User GetUserById(int id)
    {
        var query = "SELECT * FROM Users WHERE Id = @Id";
        return ReadById(id, query);
    }

    public void UpdateUser(int id, User user)
    {
        var query = "UPDATE Users SET Name = @Name, Email = @Email WHERE Id = @Id";
        Update(id, user, query);
    }

    public void DeleteUser(int id)
    {
        var query = "DELETE FROM Users WHERE Id = @Id";
        Delete(id, query);
    }
}
