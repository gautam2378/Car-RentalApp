using Car.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.IBL
{
    public interface IAuth
    {
        Task<Users> Login(LoginModel login);
    }

}
