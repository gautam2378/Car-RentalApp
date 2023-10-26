using System;
using System.Collections.Generic;
using System.Linq;
using Car.DL;
using Car.Model;
using Car.IBL;

namespace Car.BLL
{

    public class CarService : ICar
    {
        private readonly AppDbContext _context;

        public CarService(AppDbContext context)
        {
            _context = context;
        }

        public IQueryable<Cars> SearchCars(string maker, string model, decimal? rentalPrice)
        {
            IQueryable<Cars> query = _context.Cars;

            if (!string.IsNullOrWhiteSpace(maker))
            {
                query = query.Where(car => car.Maker.ToLower() == maker.ToLower());
            }

            if (!string.IsNullOrWhiteSpace(model))
            {
                query = query.Where(car => car.Model.ToLower() == model.ToLower());
            }

            if (rentalPrice.HasValue)
            {
                query = query.Where(car => car.RentalPrice <= rentalPrice.Value);
            }

            return query;
        }
    }

}
