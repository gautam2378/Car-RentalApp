using Car.DL;
using Car.IBL;
using Car.Model;
using Car_Rental_backend.Controllers;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

namespace Car.BLL
{
    public class RentalAgreementService : IUserAgreement
    {
        private readonly AppDbContext _context;
        public RentalAgreementService(AppDbContext context) { 
        _context = context;
        }
        public RentalAgreement AcceptRentalAgreement(int id)
        {
            
            var rentalAgreement = _context.RentalAgreements.Where(r=>r.Id==id).FirstOrDefault();
            if (rentalAgreement != null)
            {
                rentalAgreement.IsAccepted = true;
                _context.SaveChanges();
            }
            return rentalAgreement;
           
        }

        public RentalAgreement CreateRentalAgreement(string userId, CreateRentalAgreementModel model)
        {
        

            // Retrieve the car from the database based on the provided CarId
            var car = _context.Cars.FirstOrDefault(c => c.Id == model.CarId);

            if (car == null)
                return null;

            var isCarAvailable = IsCarAvailableForRental(model.CarId, model.RentalStartDate, model.RentalEndDate);
            if (!isCarAvailable)
                return null;
            _context.Cars.FirstOrDefault(c => c.Id == model.CarId).IsAvailable = false;
            var rentalDuration = (model.RentalEndDate - model.RentalStartDate).Days;
            var totalCost = rentalDuration * car.RentalPrice;
            var user = _context.Users.Where(c => c.Id.ToString() == userId).FirstOrDefault();
            // Create a new rental agreement
            var rentalAgreement = new RentalAgreement
            {
                User = user,
                CarId = model.CarId,
                UserId = userId, 
                RentalStartDate = model.RentalStartDate,
                RentalEndDate = model.RentalEndDate,
                TotalCost = totalCost,
                IsAccepted = false,
                IsRequestForReturn = false,
                IsReturned = false
            };

            _context.RentalAgreements.Add(rentalAgreement);
            _context.SaveChanges();

            return rentalAgreement;
        }
        public bool IsCarAvailableForRental(int carId, DateTime startDate, DateTime endDate)
        {
            var existingRental = _context.RentalAgreements
                .FirstOrDefault(ra =>
                    ra.CarId == carId &&
                    ((startDate >= ra.RentalStartDate && startDate <= ra.RentalEndDate) ||
                    (endDate >= ra.RentalStartDate && endDate <= ra.RentalEndDate)));

            return existingRental == null;
        }
        public List<RentalAgreement> GetMyRentalAgreements(string userId)
        {
            var rentalAgreements =  _context.RentalAgreements
               .Include(ra => ra.Car)
               .Include(ra => ra.User)
               .Where(ra => ra.UserId == userId)
               .ToList();
            return rentalAgreements;
        }

        public RentalAgreement RequestReturn(int rentalAgreementId)
        {
            var rentalAgreement = _context.RentalAgreements.FirstOrDefault(ra => ra.Id == rentalAgreementId);

            rentalAgreement.IsRequestForReturn = true;
            _context.SaveChanges();
            return rentalAgreement;
        }

        public RentalAgreement UpdateRentalAgreement(int id, CreateRentalAgreementModel updatedRentalAgreement)
        {
            var rentalAgreement = _context.RentalAgreements.FirstOrDefault(r=>r.Id==id);
            var Car = _context.Cars.FirstOrDefault(c=>c.Id==updatedRentalAgreement.CarId);
            if (rentalAgreement == null)
            {
                return null;
            }

            rentalAgreement.RentalStartDate = updatedRentalAgreement.RentalStartDate;
            rentalAgreement.RentalEndDate = updatedRentalAgreement.RentalEndDate;
            rentalAgreement.TotalCost = CalculateTotalCost(updatedRentalAgreement.RentalStartDate, updatedRentalAgreement.RentalEndDate, Car.RentalPrice);
            _context.SaveChanges();
            return rentalAgreement;
        }
        public decimal CalculateTotalCost(DateTime rentalStartDate, DateTime rentalEndDate, decimal rentalPricePerDay)
        {
            TimeSpan rentalDuration = rentalEndDate - rentalStartDate;
            int totalRentalDays = rentalDuration.Days;
            return rentalPricePerDay * totalRentalDays;
        }
    }
}
