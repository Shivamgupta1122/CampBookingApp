using BussinessLayer;
using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using BussinessLayer.Services;
using CampBookingApp.ModelMapper;
using CampBookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CampBookingApp.Controllers
{
    [RoutePrefix("api/Booking")]
    public class BookingController : ApiController
    {
        BussinessModeltoModel bussinessModeltoModel = new BussinessModeltoModel();
        IBookingService bookingService = (IBookingService)new ServiceFactory().GetBookingService();

        
        [HttpGet]
        [Route("AllBookings")]
        public List<Booking> GetBookings()
        {
            List<BookingBussiness> bookinglist = bookingService.GetAllBookingDetails();
            var result = bussinessModeltoModel.BookingBussinesstoBooking(bookinglist);
            try
            {
                return result;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // GET: api/Booking/5
        [HttpGet]
        [Route("GetBooking/{bookingReferenceNumber}")]
        public Booking GetBookingByReferenceNumber(string bookingReferenceNumber)
        {
            // List<Booking> result = new List<Booking>(); 
            var result = new Booking();
            try
            {
                var bookingBussiness = bookingService.GetBookingDetailByReferenceNumber(bookingReferenceNumber);
                result = bussinessModeltoModel.BookingBussinesstoBooking(bookingBussiness);
               
            }
            catch(Exception)
            {
                throw;
            }
            return result;
        }

        // POST: api/Booking
        [HttpPost]
        [Route("InitiateBooking")]
        public string InitiateBooking(Booking booking)
        {
            IBookingService bookingService = (IBookingService)new ServiceFactory().GetBookingService();
            ModeltoBussinessModel modeltoBussinessModel = new ModeltoBussinessModel();
            BookingBussiness bookingBussiness = modeltoBussinessModel.BookingtoBookingBussiness(booking);
           
            
               return bookingService.InitiateBooking(bookingBussiness);
             

           
        }

        // PUT: api/Booking/5
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE: api/Booking/5
        [HttpDelete]
        [Route("CancelBooking/{bookingReferenceNumber}")]
        public IHttpActionResult CancelBooking(string bookingReferenceNumber)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            try
            {
                if (bookingService.CheckIfExist(bookingReferenceNumber))
                {
                    bool IsBookingCanceled = bookingService.CancelBooking(bookingReferenceNumber);
                    if (!IsBookingCanceled)
                    {
                        return NotFound();
                    }
                }
                else
                {
                    return NotFound();
                }
            }
            catch (Exception)
            {
                throw;
            }
            return Ok();

        }
    }
}
