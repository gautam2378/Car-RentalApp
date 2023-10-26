using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model
{
    using System.ComponentModel.DataAnnotations;
    public class Users
    {
        public int Id { get; set; }
        [Required]
        [Display(Name = "Username")]
        public string Username { get; set; }

        [Required]
        [StringLength(100, ErrorMessage = "The {0} must be at least {2} characters long.", MinimumLength = 6)]
        [DataType(DataType.Password)]
        [Display(Name = "Password")]
        public string Password { get; set; }


        [Required(ErrorMessage = "Your must provide a PhoneNumber")]
        [Phone]
        [Display(Name = "Phone Number")]
        public string? Phone_Number { get; set; }


        public bool IsAdmin { get; set; }

    }
}
