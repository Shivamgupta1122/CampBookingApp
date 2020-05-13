using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace CampBookingApp.Models
{
    public class User
    {
        public int Id { get; set; }
        public string FullName { get; set; }
        [Required]
        public string EmailId { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public virtual ICollection<Booking> Bookings { get; set; }
    }
}