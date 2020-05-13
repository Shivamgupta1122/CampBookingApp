using BussinessLayer.BussinessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Contracts
{
    public interface IBookingService
    {
        bool CheckIfExist(string bookingrefnumber);
        string InitiateBooking(BookingBussiness bookingBussiness);
        List<BookingBussiness> GetAllBookingDetails();
        BookingBussiness GetBookingDetailByReferenceNumber(string bookingreferencenumber);
        void UpdateBooking(BookingBussiness bookingBussiness, string bookingreferencenumber);
        bool CancelBooking(string bookingreferencenumber);
    }
}
