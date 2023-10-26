using Microsoft.EntityFrameworkCore;
using Car.Model;

namespace Car.DL
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options)
            : base(options)
        {
        }

        public DbSet<Users> Users { get; set; }
        public DbSet<Cars> Cars { get; set; }
        public DbSet<RentalAgreement> RentalAgreements { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure any additional model/entity configurations here if needed
            // For example:
            // modelBuilder.Entity<User>().Property(u => u.Username).IsRequired();
        }
    }
}
