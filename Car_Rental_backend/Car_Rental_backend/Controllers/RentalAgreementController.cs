using Car.DL;
using Car.IBL;
using Car.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace Car_Rental_backend.Controllers
{
    [Authorize] // Requires authentication for all methods in this controller
    [Route("api/rentalagreements")]
    [ApiController]
    public class RentalAgreementController : ControllerBase
    {
        private readonly IUserAgreement _userAgreement;

        public RentalAgreementController(IUserAgreement userAgreement)
        {
            _userAgreement = userAgreement;
        }

        [HttpGet("myrentalagreements/{userId}")]
        public IActionResult GetMyRentalAgreements(string userId)
        {
            var rentalAgreements = _userAgreement.GetMyRentalAgreements(userId);
            return Ok(rentalAgreements);
        }

        [HttpPost("createrentalagreement")]
        public IActionResult CreateRentalAgreement([FromBody] CreateRentalAgreementModel model)
        {
            if (model == null)
                return BadRequest("Invalid rental agreement data.");
            var userId = User.FindFirstValue(ClaimTypes.NameIdentifier);
            // Retrieve the car from the database based on the provided CarId
            
            var agreement = _userAgreement.CreateRentalAgreement(userId,model);

            if (agreement == null)
                return Ok(new {message="rental Agreement can not be created"});
            

            return Ok(agreement);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateRentalAgreement(int id, [FromBody] CreateRentalAgreementModel updatedRentalAgreement)
        {
            

            var rentalAgreement = _userAgreement.UpdateRentalAgreement(id,updatedRentalAgreement);
            if (rentalAgreement == null)
            {
                return NotFound("Rental agreement not found.");
            }

            if (rentalAgreement.IsAccepted)
            {
                return BadRequest("The rental agreement has already been accepted and cannot be edited.");
            }


            try
            {
                return Ok(rentalAgreement);
            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "An error occurred while updating the rental agreement.");
            }
        }

        // Helper method to calculate the total cost based on rental start and end dates
        private decimal CalculateTotalCost(DateTime rentalStartDate, DateTime rentalEndDate, decimal rentalPricePerDay)
        {
            TimeSpan rentalDuration = rentalEndDate - rentalStartDate;
            int totalRentalDays = rentalDuration.Days;
            return rentalPricePerDay * totalRentalDays;
        }



        [HttpGet("{rentalAgreementId}/requestreturn")]
        public IActionResult RequestReturn(int rentalAgreementId)
        {
            var rentalAgreement = _userAgreement.RequestReturn(rentalAgreementId);

            if (rentalAgreement == null)
                return NotFound("Rental agreement not found.");

            // Check if the rental agreement belongs to the authenticated user
            if (rentalAgreement.UserId != User.FindFirstValue(ClaimTypes.NameIdentifier))
                return Forbid();


            return Ok(new { message="Request for return submitted successfully."});
        }

        [HttpGet("{id}/accept")]
        public async  Task<IActionResult> AcceptRentalAgreement(int id)
        {
            var rentalAgreement = _userAgreement.AcceptRentalAgreement(id);
            if (rentalAgreement == null)
            {
                return NotFound("Rental agreement not found.");
            }

            if (rentalAgreement.IsAccepted)
            {
                return BadRequest("The rental agreement has already been accepted.");
            }


            try
            {
                return Ok(new { message = "Rental agreement accepted successfully." });


            }
            catch (DbUpdateConcurrencyException)
            {
                return StatusCode(500, "An error occurred while accepting the rental agreement.");
            }
        }




    }

}
