using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataAccessModels
{
   public class UserEntity
    {
        public UserEntity()
        {
            this.Bookings = new HashSet<BookingEntity>();
        }
        [Key]
        public int Id { get; set; }
        public string FullName { get; set; }
        [Required]
        public string EmailId { get; set; }
        public string Password { get; set; }
        public bool IsAdmin { get; set; }
        public virtual ICollection<BookingEntity> Bookings { get; set; }
    }
}
