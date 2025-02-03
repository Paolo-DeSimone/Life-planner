using AutoMapper;
using ApplicationBlocks.Models;
using ApplicationBlocks.DTOs;

namespace ApplicationBlocks
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            CreateMap<User, UserDTOBase>();
            CreateMap<User, UserResponseDTO>();
            CreateMap<UserRegisterDTO, User>();
            CreateMap<UserLoginDTO, User>();
        }
    }
}
