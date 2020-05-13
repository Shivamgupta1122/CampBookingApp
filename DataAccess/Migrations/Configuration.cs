namespace DataAccess.Migrations
{
    using DataAccess.DataAccessModels;
    using System;
    using System.Collections.Generic;
    using System.Data.Entity;
    using System.Data.Entity.Migrations;
    using System.Linq;

    internal sealed class Configuration : DbMigrationsConfiguration<DataAccess.DataBaseContext.CampBookingContext>
    {
        public Configuration()
        {
            AutomaticMigrationsEnabled = false;
        }

        protected override void Seed(DataAccess.DataBaseContext.CampBookingContext context)
        {
            //  This method will be called after migrating to the latest version.

            //  You can use the DbSet<T>.AddOrUpdate() helper extension method
            //  to avoid creating duplicate seed data.
           /* var user = new List<UserEntity>
            {
               new UserEntity{Id=1,FullName="Shivam Gupta",EmailId = "shivam@gmail.com",Password="123456@", IsAdmin = true},
               new UserEntity {FullName = "Rahul Gupta", EmailId = "rahul@gmail.com", Password = "123456@", IsAdmin = false },
               new UserEntity{FullName="Mohan Gupta",EmailId = "mohan@gmail.com",Password="123456@", IsAdmin = false},
               new UserEntity{FullName="Ramesh Goyal",EmailId = "ramesh.goyal@gmail.com",Password="123456@", IsAdmin = false},
               new UserEntity{FullName="Raju",EmailId = "raju@gmail.com",Password="123456@", IsAdmin = false},
               new UserEntity{FullName="Piyush Garg",EmailId = "piyush@gmail.com",Password="123456@", IsAdmin = false}

            };
            user.ForEach(s => context.Users.Add(s));
            context.SaveChanges();
            */

            var bookings = new List<BookingEntity>
            {
                new BookingEntity{BookingReferenceNumber = "34555", BillingAddress = "Rohtak", TotalNights = 2, FinalAmount = 2400, NumberOfGuests = 2, CampId = 1, CheckInDate = DateTime.Parse("2020-05-05"), CheckOutDate = DateTime.Parse("2020-05-05"), CellPhone = 2567891234, Country = "India", State = "Haryana", ZipCode = 124001, UserId = 1},
                new BookingEntity{BookingReferenceNumber = "67233", BillingAddress = "Rohtak", TotalNights = 4, FinalAmount = 4800, NumberOfGuests = 2, CampId = 2, CheckInDate = DateTime.Parse("2020-05-04"), CheckOutDate = DateTime.Parse("2020-05-06"), CellPhone = 2567891234, Country = "India", State = "Haryana", ZipCode = 124001, UserId = 1}
            };
            bookings.ForEach(s => context.Bookings.Add(s));
            context.SaveChanges();

           /* var camps = new List<CampEntity>
            {
               new CampEntity{ Title = "MountainCamp", Capacity = 4, Description = "This is a mountain side camp", IsActive = true, PriceforWeekdays = 1200, PriceforWeekends = 1400},
               new CampEntity{Title = "RiverCamp", Capacity = 4, Description = "This is a river side camp", IsActive = true,PriceforWeekdays = 1200, PriceforWeekends = 1400},
            };
            camps.ForEach(s => context.Camps.Add(s));
            context.SaveChanges();*/
            
        }
    }
}
