using AutoMapper;
using ApplicationBlocks.Models;
using ApplicationBlocks.DTOs;

namespace ApplicationBlocks
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTO>(); // User to UserDTO. Ha tutti i campi di User.
            CreateMap<UserDTO, User>();

        }
    }
}
