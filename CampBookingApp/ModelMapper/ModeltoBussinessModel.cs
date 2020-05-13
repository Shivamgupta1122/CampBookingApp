using BussinessLayer.BussinessModels;
using CampBookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CampBookingApp.ModelMapper
{
    public class ModeltoBussinessModel
    {
        public UserBussiness AccounttoAccountBussiness(User account)
        {
            UserBussiness accountBussiness = new UserBussiness
            {
                EmailId = account.EmailId,
                FullName = account.FullName,
                IsAdmin = account.IsAdmin,
                Password = account.Password,
            };
            return accountBussiness;
        }
        public BookingBussiness BookingtoBookingBussiness(Booking booking)
        {
            BookingBussiness bookingBussiness = new BookingBussiness
            {
              //  BookingReferenceNumber = booking.BookingReferenceNumber,
                BillingAddress = booking.BillingAddress,
                CellPhone = booking.CellPhone,
                CheckInDate = booking.CheckInDate,
                CheckOutDate = booking.CheckOutDate,
                FinalAmount = booking.FinalAmount,
                NumberOfGuests = booking.NumberOfGuests,
                ZipCode = booking.ZipCode,
                Country = booking.Country,
                State = booking.State,
                CampId = booking.CampId,
                 TotalNights = booking.TotalNights,
                 UserId = booking.UserId
               
            };
            return bookingBussiness;
        }
        public CampBussiness CamptoCampBussiness(Camp camp)
        {
            CampBussiness campBussiness = new CampBussiness
            {
                Id = camp.Id,
                Title = camp.Title,
                Description = camp.Description,
                Capacity = camp.Capacity,
                PriceforWeekdays = camp.PriceforWeekdays,
                PriceforWeekends = camp.PriceforWeekends,
                ImageURL = camp.ImageURL,
                IsActive = camp.IsActive
            };
            return campBussiness;
        }
        public List<CampBussiness> CamptoCampBussiness(List<Camp> camps)
        {
            List<CampBussiness> result = new List<CampBussiness>();
            foreach (Camp camp in camps)
            {
                CampBussiness campBussiness = CamptoCampBussiness(camp);
                result.Add(campBussiness);
            }
            return result;
        }
        public List<BookingBussiness> BookingEntityToBussiness(List<Booking> bookings)
        {
            List<BookingBussiness> result = new List<BookingBussiness>();
            foreach (Booking booking in bookings)
            {
                BookingBussiness bookingBussiness = BookingtoBookingBussiness(booking);
                result.Add(bookingBussiness);
            }
            return result;
        }

    }
}