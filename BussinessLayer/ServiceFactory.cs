using BussinessLayer.Contracts;
using BussinessLayer.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer
{
    public  class ServiceFactory
    {
        public ICampService GetCampService()
        {
            return new CampService();
        }
        public IAccountService GetAccountService()
        {
            return new AccountService();
        }
        public IBookingService GetBookingService()
        {
            return new BookingService();
        }
    }
}
