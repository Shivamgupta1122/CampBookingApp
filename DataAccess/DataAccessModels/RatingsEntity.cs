using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DataAccessModels
{
    public class RatingsEntity
    {
        [Key]
        [ForeignKey("Camp")]
        public int CampID { get; set; }
        [Required(ErrorMessage = "Please enter Rateing")]
        public double Rateing { get; set; }
        public virtual CampEntity Camp { get; set; }
    }
}
