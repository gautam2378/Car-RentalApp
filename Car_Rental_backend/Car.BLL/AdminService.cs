using Car.DL;
using Car.IBL;
using Car.Model;
using Car_Rental_backend.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.BLL
{
    public class AdminService : IAdmin
    {
        private readonly AppDbContext _context;

        public AdminService(AppDbContext context)
        {
            _context = context;
        }

        public IEnumerable<RentalAgreement> GetAllRentalAgreements()
        {
            return _context.RentalAgreements.Include(ra => ra.Car).Include(ra => ra.User).ToList();
        }

        public RentalAgreement UpdateRentalAgreement(int id, CreateRentalAgreementModel updatedRentalAgreement)
        {
            var rentalAgreement = _context.RentalAgreements.FirstOrDefault(ra => ra.Id == id);
            var car = _context.Cars.FirstOrDefault(car=>car.Id==updatedRentalAgreement.CarId);

            if (rentalAgreement == null)
                return null;

            rentalAgreement.RentalStartDate = updatedRentalAgreement.RentalStartDate;
            rentalAgreement.RentalEndDate = updatedRentalAgreement.RentalEndDate;
            rentalAgreement.TotalCost = rentalAgreement.TotalCost;

            _context.SaveChanges();

            return rentalAgreement;
        }

        public void DeleteRentalAgreement(int id)
        {
            var rentalAgreement = _context.RentalAgreements.FirstOrDefault(ra => ra.Id == id);
            var car = _context.Cars.FirstOrDefault(c=>c.Id==rentalAgreement.CarId);
            if (car != null)
            {
                car.IsAvailable = true;
            }
            if (rentalAgreement == null)
                return;

            _context.RentalAgreements.Remove(rentalAgreement);
            _context.SaveChanges();
        }

        public IEnumerable<Cars> ValidateReturnCars()
        {
            var returnRequestedCars = _context.RentalAgreements
                .Where(ra => ra.IsRequestForReturn)
                .Select(ra => ra.Car)
                .ToList();

            return returnRequestedCars;
        }

        public RentalAgreement MarkCarReturned(int id)
        {
            var rentalAgreement = _context.RentalAgreements.FirstOrDefault(ra => ra.CarId == id && ra.IsRequestForReturn);

            if (rentalAgreement == null)
                return null;

            rentalAgreement.IsRequestForReturn = false;
            rentalAgreement.IsReturned = true;

            // Optionally, update the car availability
            var car = _context.Cars.FirstOrDefault(c => c.Id == id);
            if (car != null)
            {
                car.IsAvailable = true;
            }

            _context.SaveChanges();

            return rentalAgreement;
        }

        public Cars AddCar(CarModel car)
        {
            var car1 = new Cars
            {
                Maker = car.Maker,
                Model = car.Model,
                imageLink = car.imageLink,
                RentalPrice = car.RentalPrice,
                IsAvailable = car.IsAvailable
            };
            _context.Cars.Add(car1);
            _context.SaveChanges();
            return car1;
        }
    }

}
