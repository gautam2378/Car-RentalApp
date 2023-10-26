using Car.Model;
using Car_Rental_backend.Controllers;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.IBL
{
    public interface IAdmin
    {
        IEnumerable<RentalAgreement> GetAllRentalAgreements();
        RentalAgreement UpdateRentalAgreement(int id, CreateRentalAgreementModel updatedRentalAgreement);
        void DeleteRentalAgreement(int id);
        IEnumerable<Cars> ValidateReturnCars();
        RentalAgreement MarkCarReturned(int id);
        Cars AddCar(CarModel car);
    }

}
