using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BussinessLayer.BussinessModels
{
   public class UserBussiness
    {
        
        public int Id { get; set; }
        public string FullName { get; set; }
        [Required]
        [Key]
        public string EmailId { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public virtual ICollection<BookingBussiness> Bookings { get; set; }
    }
}
