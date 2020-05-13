using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using BussinessLayer.MannualMap;
using DataAccess.DataAccessModels;
using DataAccess.DatabaseOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.Services
{
    public class BookingService : IBookingService
    {
        BussinesstoEntity bussinesstoEntity = new BussinesstoEntity();
        EntitytoBussiness entitytoBussiness = new EntitytoBussiness();
        BookingOperations bookingOperations = new BookingOperations();
        public bool CheckIfExist(string bookingrefnumber)
        {
            return bookingOperations.checkIfExist(bookingrefnumber);
        }
        public bool CancelBooking(string bookingreferencenumber)
        {
           return bookingOperations.CancelBooking(bookingreferencenumber);
        }

        public List<BookingBussiness> GetAllBookingDetails()
        {
            var bookingDetailsEntity = bookingOperations.GetAllBookings();
            var bookingDetailsBussiness = entitytoBussiness.BookingEntityToBussiness(bookingDetailsEntity);
            return bookingDetailsBussiness;
        }

        public BookingBussiness GetBookingDetailByReferenceNumber(string bookingreferencenumber)
        {
            BookingEntity bookingDetailsByRef = bookingOperations.GetBookingsByReferenceNumber(bookingreferencenumber);
            var result = entitytoBussiness.BookingEntityToBussiness(bookingDetailsByRef);
            return result;
        }

        public string InitiateBooking(BookingBussiness bookingBussiness)
        {
            BookingEntity bookingEntity = bussinesstoEntity.BookingBussinessToEntity(bookingBussiness);
           return bookingOperations.InitiateBoking(bookingEntity);
        }

        public void UpdateBooking(BookingBussiness bookingBussiness, string bookingreferencenumber)
        {
            throw new NotImplementedException();
        }
    }
}
