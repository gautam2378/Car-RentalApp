using Car.DL;
using Car.IBL;
using Car.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Data;
using System.Diagnostics.Metrics;

namespace Car_Rental_backend.Controllers
{
    // AdminController.cs
    [Authorize(Roles = "admin")]
    [ApiController]
    [Route("api/admin")]
    public class AdminController : ControllerBase
    {
        private readonly IAdmin _adminService;

        public AdminController(IAdmin adminService)
        {
            _adminService = adminService;
        }

        [HttpGet("rentalAgreements")]
        public IActionResult GetAllRentalAgreements()
        {
            var rentalAgreements = _adminService.GetAllRentalAgreements();
            return Ok(rentalAgreements);
        }

        [HttpPut("rentalAgreements/{id}")]
        public IActionResult UpdateRentalAgreement(int id, [FromBody] CreateRentalAgreementModel updatedRentalAgreement)
        {
            try
            {
                var rentalAgreement = _adminService.UpdateRentalAgreement(id, updatedRentalAgreement);
                return Ok(rentalAgreement);
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpDelete("rentalAgreements/{id}")]
        public IActionResult DeleteRentalAgreement(int id)
        {
            try
            {
                _adminService.DeleteRentalAgreement(id);
                return Ok(new { message = "The Agreement has been deleted." });
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }

        [HttpGet("validateReturnCars")]
        public IActionResult ValidateReturnCars()
        {
            var returnRequestedCars = _adminService.ValidateReturnCars();
            return Ok(returnRequestedCars);
        }

        [HttpGet("markCarReturned/{id}")]
        public IActionResult MarkCarReturned(int id)
        {
            try
            {
                var rentalAgreement = _adminService.MarkCarReturned(id);
                if (rentalAgreement!=null && rentalAgreement.IsReturned==true)
                    return Ok(new { isReturned = true, carId = id, message = "Car is returned Successfully" });
                else
                    return BadRequest("Failed to mark the car as returned.");
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
        [HttpPost("addcar")]
        public IActionResult AddCar(CarModel car )
        {
            try
            {
                if (car.Maker=="" || car.Model == "" || car.imageLink=="")
                {
                    return Ok(new { message = "Please Enter Details" });
                }
                else
                { var car1 = _adminService.AddCar(car);
                    
                    string message = "Car added successfully " + car1.Maker + car1.Model;
                    return Ok(new { message = message , car=car1 });
                }
            }
            catch (Exception ex)
            {
                return NotFound(ex.Message);
            }
        }
    }


}
