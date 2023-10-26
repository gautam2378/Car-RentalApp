using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Car.Model;
namespace Car.IBL
{
    public interface ICar
    {
        IQueryable<Cars> SearchCars(string maker, string model, decimal? rentalPrice);
    }

}
