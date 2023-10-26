using Car.Model;
using Car_Rental_backend.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.IBL
{
    public interface IUserAgreement
    {
        List<RentalAgreement> GetMyRentalAgreements(string userId);
        RentalAgreement CreateRentalAgreement(string userId,CreateRentalAgreementModel model);
        RentalAgreement UpdateRentalAgreement(int id, CreateRentalAgreementModel updatedRentalAgreement);
        RentalAgreement RequestReturn(int rentalAgreementId);
        RentalAgreement AcceptRentalAgreement(int id);
        bool IsCarAvailableForRental(int carId, DateTime startDate, DateTime endDate);
        decimal CalculateTotalCost(DateTime rentalStartDate, DateTime rentalEndDate, decimal rentalPricePerDay);
    }

}
