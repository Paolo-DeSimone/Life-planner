using AutoMapper;
using ApplicationBlocks.Models;
using ApplicationBlocks.DTOs;

namespace ApplicationBlocks.Utilites
{
    public class ApplicationDTOMapping : Profile
    {
        public ApplicationDTOMapping()
        {
            CreateMap<User, UserDTO>(); // User to UserDTO. Ha tutti i campi di User.
            CreateMap<UserDTO, User>();

        }
    }
}
