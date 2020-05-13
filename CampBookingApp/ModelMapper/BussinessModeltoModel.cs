using BussinessLayer.BussinessModels;
using CampBookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace CampBookingApp.ModelMapper
{
    public  class BussinessModeltoModel
    {
        User AccountBuusinesstoAccount(UserBussiness accountBussiness)
        {
            User user = new User
            {
                EmailId = accountBussiness.EmailId,
                FullName = accountBussiness.FullName,
                IsAdmin = accountBussiness.IsAdmin,
                Password = accountBussiness.Password,
            };
            return user;
        }
        public Booking BookingBussinesstoBooking(BookingBussiness bookingBussiness)
        {
            Booking booking = new Booking
            {
               // BookingReferenceNumber = bookingBussiness.BookingReferenceNumber,
                BillingAddress = bookingBussiness.BillingAddress,
                CellPhone = bookingBussiness.CellPhone,
                CheckInDate = bookingBussiness.CheckInDate,
                CheckOutDate = bookingBussiness.CheckOutDate,
                FinalAmount = bookingBussiness.FinalAmount,
                NumberOfGuests = bookingBussiness.NumberOfGuests,
                ZipCode = bookingBussiness.ZipCode,
                Country = bookingBussiness.Country,
                State = bookingBussiness.State,
                UserId = bookingBussiness.UserId,
                 CampId = bookingBussiness.CampId,
                 TotalNights = bookingBussiness.TotalNights,
                  Id = bookingBussiness.Id,
                   BookingReferenceNumber = bookingBussiness.BookingReferenceNumber
            };
            return booking;
        }
        public Camp CampBussinesstoModel(CampBussiness campBussiness)
        {
            Camp camp = new Camp
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
            return camp;
        }
        public List<Booking> BookingBussinesstoBooking(List<BookingBussiness> bookingBussinesses)
        {
            List<Booking> result = new List<Booking>();
            foreach(BookingBussiness bookingBussiness in bookingBussinesses)
            {
                Booking booking = new Booking
                {
                  //  BookingReferenceNumber = bookingBussiness.BookingReferenceNumber,
                    BillingAddress = bookingBussiness.BillingAddress,
                    CellPhone = bookingBussiness.CellPhone,
                    CheckInDate = bookingBussiness.CheckInDate,
                    CheckOutDate = bookingBussiness.CheckOutDate,
                    FinalAmount = bookingBussiness.FinalAmount,
                    NumberOfGuests = bookingBussiness.NumberOfGuests,
                    ZipCode = bookingBussiness.ZipCode,
                    Country = bookingBussiness.Country,
                    State = bookingBussiness.State,
                     TotalNights = bookingBussiness.TotalNights,
                      UserId = bookingBussiness.UserId,
                       CampId = bookingBussiness.CampId,
                        Id = bookingBussiness.Id
                        

                };
                result.Add(booking);
            }
            return result;
        }
        public List<Camp> CampBussinesstoModel(List<CampBussiness> campBussinesses)
        {
            var result = new List<Camp>();
            foreach(CampBussiness campBussiness in campBussinesses)
            {
                var camp = CampBussinesstoModel(campBussiness);
                result.Add(camp);
            }
            return result;
        }
    }
}