using DataAccess.DataAccessModels;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace DataAccess.DataBaseContext
{
   public class CampBookingContext : DbContext
    {
        public CampBookingContext()

           : base("CampBookingContext")

        {

        }
        public virtual DbSet<UserEntity> Users { get; set; }
        public virtual DbSet<CampEntity> Camps { get; set; }
        public virtual DbSet<BookingEntity> Bookings { get; set; }
        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();
        }
    }
}
