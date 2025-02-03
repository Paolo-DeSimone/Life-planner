namespace ApplicationBlocks.DTOs
{
    public class UserDTOBase
    {
        public int Id { get; set; }
        public string? Name { get; set; }
        public string? Email { get; set; }
    }

    public class UserRegisterDTO
    {
        public string? Name { get; set; }
        public string? Email { get; set; }
        public string? Password { get; set; } // Lo usiamo solo in fase di registrazione
    }

    public class UserLoginDTO
    {
        public string? Email { get; set; }
        public string? Password { get; set; }
    }

    public class UserResponseDTO : UserDTOBase
    {
        public string? Token { get; set; } // Per autenticazione JWT
    }
}
