using DataAccess.DataAccessModels;
using DataAccess.DataBaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DatabaseOperations
{
    public class BookingOperations
    {
        //Booking reference number generator
        public string random()
        {
            var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
            var stringChars = new char[8];
            var random = new Random();
            for (int i = 0; i < stringChars.Length; i++)
            {
                stringChars[i] = chars[random.Next(chars.Length)];
            }
            var finalString = new String(stringChars);
            return finalString;
        }
        CampBookingContext context = new CampBookingContext();
        public bool checkIfExist(string bookingrefnumber)
        {
            if(context.Bookings.Any(s => s.BookingReferenceNumber.Equals(bookingrefnumber)))
            {
                return true;
            }
            else
            {
                return false;
            }
        }
        //Creates new Booking for a camp
        public string InitiateBoking(BookingEntity bookingEntity)
        {
            bookingEntity.BookingReferenceNumber = random();
            var camptoBook = (from c in context.Camps
                              where bookingEntity.CampId == c.Id select c).FirstOrDefault();

            if (bookingEntity.CheckInDate.CompareTo(DateTime.Today) == 0)
            {
                camptoBook.IsActive = false;
            }
            context.Bookings.Add(bookingEntity);
            try
            {
                context.SaveChanges();
            }
            catch(Exception ex)
            {
                throw ex;
            }
            return bookingEntity.BookingReferenceNumber;
        }
        //Returns all the booking entries from database.
        public List<BookingEntity> GetAllBookings()
        {
            var allBookings = context.Bookings.ToList();
            return allBookings;
        }
        //Searches for the booking entry from db by referenceNumber
        public BookingEntity GetBookingsByReferenceNumber(string bookingReferenceNumber)
        {
            var result = context.Bookings.Where(s => s.BookingReferenceNumber == bookingReferenceNumber).FirstOrDefault();
            return result;
        }
        //Cancel the booking
        //Deletes the specified booking entry fron database
        public bool CancelBooking(string BookingReferenceNumber)
        {
                //Get the booking to be cancelled fron db
                var requiredBooking = context.Bookings.Where(s => s.BookingReferenceNumber == BookingReferenceNumber).FirstOrDefault();
                if (requiredBooking != null && requiredBooking.CheckInDate > DateTime.Now)
                {
                    bool IsActive = (from camp in context.Camps
                    where requiredBooking.CampId == camp.Id
                    select camp.IsActive).FirstOrDefault();
                    IsActive = true;
                    var camptobeActive = (from camp in context.Camps
                                     where requiredBooking.CampId == camp.Id select camp).FirstOrDefault();
                    camptobeActive.IsActive = true;
                    context.Bookings.Remove(requiredBooking);
                    context.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            
        }
        //Returns all the entries from booking for which checkindate and checkoutdate fits according to the parameter
        public List<int> campsBetween(DateTime checkIn, DateTime checkOut)
        {
            using (var context = new CampBookingContext())
            {
                var result = context.Bookings
                    .Where(s => (checkIn <= s.CheckInDate && s.CheckOutDate <= checkOut) ||
                        (checkIn >= s.CheckInDate && checkOut <= s.CheckOutDate))
                    .Select(s => s.Id).ToList();
                return result;
            }
        }
        public void removeBookingByCampId(int campId)
        {
                var requiredBookings = context.Bookings.Where(bookings => bookings.CampId == campId).ToList();
                foreach (var booking in requiredBookings)
                {
                    context.Bookings.Remove(booking);
                }
                context.SaveChanges();
        }
    }
}
