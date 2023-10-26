// AuthController.cs
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using System;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;
using Car.Model;
using Car.DL;
using Microsoft.EntityFrameworkCore;
using Car.IBL;



namespace Car_Rental_backend.Controllers
{
    [Route("api/auth")]
    [ApiController]
    public class AuthController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IAuth _authService;



        public AuthController(IConfiguration configuration, IAuth authService)
        {
            _configuration = configuration;
            _authService = authService;
        }





        [HttpGet("userinfo")]
        public IActionResult GetUserInfo()
        {



            var token = HttpContext.Request.Headers["Authorization"].ToString().Replace("Bearer ", "");



            if (!string.IsNullOrEmpty(token))
            {
                var jsonToken = new System.IdentityModel.Tokens.Jwt.JwtSecurityToken(token);
                var userId = jsonToken?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.NameIdentifier)?.Value;


                var username = jsonToken?.Claims.FirstOrDefault(c => c.Type == ClaimTypes.Name)?.Value;
                var isAdmin = jsonToken?.Claims.Any(c => c.Type == ClaimTypes.Role && c.Value == "admin");

                return Ok(new
                {
                    id = userId,
                    IsAdmin = isAdmin,
                    UserName = username
                });
            }



            return BadRequest("User not found");
        }



        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] LoginModel login)
        {
            var user = await _authService.Login(login);



            if (user == null)
                return Unauthorized();



            var claims = new[]
            {
            new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
            new Claim(ClaimTypes.Name, user.Username),
            new Claim(ClaimTypes.Role, user.IsAdmin ? "admin" : "user"),
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString())

        };



            var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:SecretKey"]));
            var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);



            var token = new JwtSecurityToken(
                _configuration["Jwt:Issuer"],
                _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(30),
                signingCredentials: creds
            );



            return Ok(new
            {
                token = new JwtSecurityTokenHandler().WriteToken(token),

            });
        }
    }
}