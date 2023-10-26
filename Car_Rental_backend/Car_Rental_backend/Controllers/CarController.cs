using Car.Model;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Linq;
using Car.IBL;
namespace Car_Rental_backend.Controllers
{
    [Authorize] // Requires authentication for all methods in this controller
    [Route("api/cars")]
    [ApiController]
    public class CarController : ControllerBase
    {
        private readonly ICar _carService;

        public CarController(ICar carService)
        {
            _carService = carService;
        }

        [HttpGet("search")]
        public IActionResult SearchCars([FromQuery] string? maker, [FromQuery] string? model, [FromQuery] decimal? rentalPrice)
        {
            var matchingCars = _carService.SearchCars(maker, model, rentalPrice).ToList();
            return Ok(matchingCars);
        }
    }
}
