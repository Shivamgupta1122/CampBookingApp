using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CampBookingApp.Models
{
    public class Camp
    {
        [Key]
        public int Id { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }

        public int Capacity { get; set; }
        public int PriceforWeekdays { get; set; }
        public int PriceforWeekends { get; set; }
        public string ImageURL { get; set; }
        public bool IsActive { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}