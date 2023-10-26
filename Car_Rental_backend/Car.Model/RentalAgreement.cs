using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model
{
    public class RentalAgreement
    {
        public int Id { get; set; }
        public string UserId { get; set; }
        public Users User { get; set; }
        public int CarId { get; set; }
        public Cars Car { get; set; }
        public DateTime RentalStartDate { get; set; }
        public DateTime RentalEndDate { get; set; }
        public decimal TotalCost { get; set; }
        public bool IsAccepted { get; set; }
        public bool IsRequestForReturn { get; set; }
        public bool IsReturned { get; set; }
    }
}
