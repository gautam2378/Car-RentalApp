namespace Car_Rental_backend.Controllers
{
    public class CreateRentalAgreementModel
    {
        public int CarId { get; set; }
        public DateTime RentalStartDate { get; set; }
        public DateTime RentalEndDate { get; set; }
    }

}
