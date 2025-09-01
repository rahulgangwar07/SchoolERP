
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace SchoolERP.Server.Models.Configurations
{
    // School entity that will be saved in the database
    [Table("schoolmaster")]
    public class Schools
    {
        [Key]
        public int Id { get; set; }

        [Required]
        [StringLength(255)]
        public string SchoolName { get; set; }

        [StringLength(255)]
        public string SchoolId { get; set; }

        [StringLength(255)]
        public string Address { get; set; }

        [StringLength(255)]
        public string City { get; set; }

        [StringLength(255)]
        public string State { get; set; }

        [StringLength(255)]
        public string Country { get; set; }

        [StringLength(20)]
        public string PostalCode { get; set; }

        [StringLength(15)]
        public string PhoneNumber { get; set; }

        [StringLength(255)]
        public string Email { get; set; }

        [StringLength(255)]
        public string Website { get; set; }

        public DateTime? EstablishmentDate { get; set; }

        [StringLength(255)]
        public string SchoolType { get; set; }

        [StringLength(255)]
        public bool SchoolStatus { get; set; }

        // Store file name or file path here, not IFormFile
        public string SchoolLogo { get; set; }

        public string SchoolDescription { get; set; }

        [StringLength(255)]
        public string SchoolBoard { get; set; }

        public decimal TotalArea { get; set; }

        public string SchoolFacilities { get; set; }

        public bool TransportationAvailable { get; set; }

        [StringLength(255)]
        public string EmergencyContact { get; set; }

        public DateTime CreatedAt { get; set; }

        public DateTime? UpdatedAt { get; set; }

        public int CreatedBy { get; set; }

        public int? UpdatedBy { get; set; }

        public static implicit operator Schools(string v)
        {
            throw new NotImplementedException();
        }
    }


    public class SchoolDto
    {
        [Key]
        public int Id { get; set; }
        public string SchoolName { get; set; }
        public string SchoolId { get; set; }
        public string Address { get; set; }
        public string City { get; set; }
        public string State { get; set; }
        public string Country { get; set; }
        public string PostalCode { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }
        public string Website { get; set; }
        public DateTime? EstablishmentDate { get; set; }
        public string SchoolType { get; set; }
        public bool SchoolStatus { get; set; }
        [NotMapped]
        //public IFormFile SchoolLogo { get; set; }   // This will be used for file uploads
        public string SchoolDescription { get; set; }
        public string SchoolBoard { get; set; }
        public decimal TotalArea { get; set; }
        public string SchoolFacilities { get; set; }
        public bool TransportationAvailable { get; set; }
        public string EmergencyContact { get; set; }
    }


}
