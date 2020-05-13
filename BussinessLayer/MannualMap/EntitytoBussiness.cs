using BussinessLayer.BussinessModels;
using DataAccess.DataAccessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.MannualMap
{
    public class EntitytoBussiness
    {
       public UserBussiness AccountEntityToBussiness(UserEntity accountEntity)
        {
            UserBussiness accountBussiness = new UserBussiness
            {
                EmailId = accountEntity.EmailId,
                FullName = accountEntity.FullName,
                IsAdmin = accountEntity.IsAdmin,
                Password = accountEntity.Password,
            };
            return accountBussiness;
        }
       public  BookingBussiness BookingEntityToBussiness(BookingEntity bookingEntity)
        {
            BookingBussiness bookingBussiness = new BookingBussiness
            {
                BookingReferenceNumber = bookingEntity.BookingReferenceNumber,
                BillingAddress = bookingEntity.BillingAddress,
                CellPhone = bookingEntity.CellPhone,
                CheckInDate = bookingEntity.CheckInDate,
                CheckOutDate = bookingEntity.CheckOutDate,
                FinalAmount = bookingEntity.FinalAmount,
                NumberOfGuests = bookingEntity.NumberOfGuests,
                ZipCode = bookingEntity.ZipCode,
                Country = bookingEntity.Country,
                State = bookingEntity.State,
                 CampId = bookingEntity.CampId,
                 TotalNights = bookingEntity.TotalNights,
                 UserId = bookingEntity.UserId,
                  
            };
            return bookingBussiness;
        }
       public CampBussiness CampEntityToBussiness(CampEntity campEntity)
        {
            CampBussiness campBussiness = new CampBussiness
            {
                Id = campEntity.Id,
                Title = campEntity.Title,
                Description = campEntity.Description,
                Capacity = campEntity.Capacity,
                PriceforWeekdays = campEntity.PriceforWeekdays,
                PriceforWeekends = campEntity.PriceforWeekends,
                ImageURL = campEntity.ImageURL,
                IsActive = campEntity.IsActive
            };
            return campBussiness;
        }
        public List<CampBussiness>CampEntityToBussiness(List<CampEntity> campEntities)
        {
            List<CampBussiness> result = new List<CampBussiness>();
            foreach(CampEntity entity in campEntities)
            {
                CampBussiness campBussiness = CampEntityToBussiness(entity);
                result.Add(campBussiness);
            }
            return result;
        }
        public List<BookingBussiness> BookingEntityToBussiness(List<BookingEntity> bookingEntities)
        {
            List<BookingBussiness> result = new List<BookingBussiness>();
            foreach (BookingEntity entity in bookingEntities)
            {
                BookingBussiness bookingBussiness = BookingEntityToBussiness(entity);
                result.Add(bookingBussiness);
            }
            return result;
        }

    }
}
