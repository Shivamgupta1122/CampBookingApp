using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataAccessModels
{
    public class CampEntity
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
        public virtual ICollection<BookingEntity> Bookings { get; set; }
    }
}
