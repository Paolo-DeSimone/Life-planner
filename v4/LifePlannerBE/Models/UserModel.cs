using Microsoft.AspNetCore.Mvc;

namespace Models{
    public class UserModel : ControllerBase
    {
        public string Get()
        {
            return "LifePlanner API is running!";
        }
    }
}

