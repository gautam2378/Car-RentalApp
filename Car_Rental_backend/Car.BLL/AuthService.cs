using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Car.DL;
using Car.Model;
using Microsoft.EntityFrameworkCore;
using Car.IBL;
namespace Car.BLL
{
    public class AuthService : IAuth
    {
        private readonly AppDbContext _context;

        public AuthService( AppDbContext context)
        {
            _context = context;
        }

        public async Task<Users> Login(LoginModel login)
        {
            var user = await _context.Users.SingleOrDefaultAsync(u => u.Username == login.Username && u.Password == login.Password);

            if (user == null)
                throw new UnauthorizedAccessException();

            return user;
        }

    }

}
