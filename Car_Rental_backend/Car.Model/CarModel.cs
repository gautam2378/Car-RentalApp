using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Car.Model
{
    public class CarModel
    {
        public string Maker { get; set; }
        public string Model { get; set; }
        public string imageLink { get; set; }
        public decimal RentalPrice { get; set; }
        public bool IsAvailable { get; set; }
    }
}
