using BussinessLayer.BussinessModels;
using DataAccess.DataAccessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.MannualMap
{
    public class BussinesstoEntity
    {
        public UserEntity AccountBussinessToEntity(UserBussiness accountBussiness)
        {
            UserEntity accountEntity = new UserEntity
            {
               EmailId = accountBussiness.EmailId,
               FullName = accountBussiness.FullName,
               IsAdmin = accountBussiness.IsAdmin,
               Password = accountBussiness.Password,
            };
            return accountEntity;
        }
        public BookingEntity BookingBussinessToEntity(BookingBussiness bookingBussiness)
        {
            BookingEntity bookingEntity = new BookingEntity
            {
               // BookingReferenceNumber = bookingBussiness.BookingReferenceNumber,
                BillingAddress = bookingBussiness.BillingAddress,
                CellPhone = bookingBussiness.CellPhone,
                CheckInDate = bookingBussiness.CheckInDate,
                CheckOutDate = bookingBussiness.CheckOutDate,
                FinalAmount = bookingBussiness.FinalAmount,
                TotalNights = bookingBussiness.TotalNights,
                 UserId = bookingBussiness.UserId,
                  CampId = bookingBussiness.CampId,
                  
                NumberOfGuests = bookingBussiness.NumberOfGuests,
                ZipCode = bookingBussiness.ZipCode,
                Country = bookingBussiness.Country,
                State = bookingBussiness.State,
            };
            return bookingEntity;
        }
       public  CampEntity CampBussinessToEntity(CampBussiness campBussiness)
        {
            CampEntity campEntity = new CampEntity
            {
                Id = campBussiness.Id,
                Title = campBussiness.Title,
                Description = campBussiness.Description,
                Capacity = campBussiness.Capacity,
                 ImageURL = campBussiness.ImageURL,
                PriceforWeekdays = campBussiness.PriceforWeekdays,
                PriceforWeekends = campBussiness.PriceforWeekends,
                IsActive = campBussiness.IsActive
            };
            return campEntity;
        }
    }
}
