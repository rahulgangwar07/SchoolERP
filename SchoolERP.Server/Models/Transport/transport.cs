using DocumentFormat.OpenXml.Bibliography;
using DocumentFormat.OpenXml.Office2016.Drawing.ChartDrawing;
using DocumentFormat.OpenXml.Wordprocessing;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SchoolERP.Server.Models.Configurations;
using SchoolERP.Server.Models.Student_Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Security.Cryptography.X509Certificates;
using System.Security.Principal;

namespace SchoolERP.Server.Models.Transport
{
    public class transport
    {
    }

    [Table("TransportRoutes")]
    public class TransportRoutes
    {
        [Key]
        public int route_id { get; set; }
        public string route_Code { get; set; }
        public string route_name { get; set; }
        public string description { get; set; }
        public string start_location { get; set; }
        public string end_location { get; set; }
        public string aaplied_month { get; set; }
        public string maximum_stop_fare { get; set; }
        public bool isActive { get; set; } = true;
        public string school_id { get; set; }
    }

    [Table("TransportStops")]
    public class TransportStops
    {
        [Key]
        public int stop_id { get; set; }
        public int route_id { get; set; }
        public string stop_name { get; set; }
        public int amount { get; set; }
        public TimeOnly? picktime { get; set; }
        public TimeOnly? stoptime { get; set; }
        public int sequenceNo { get; set; }
        public string school_id { get; set; }
    }

    [Table("VehicleType")]
    public class VehicleType
    {
        [Key]
        public int vehicle_type_id { get; set; }
        public string model_name { get; set; }
        public string model_type { get; set; }
        public bool isActive { get; set; }
        public string school_id { get; set; }
    }

    [Table("Vehicles")]
    public class Vehicles
    {
        [Key]
        public int vehicle_id { get; set; } 
        public string vehicle_number { get; set; }
        public string insurance_no { get; set; }
        public DateTime insurance_expiry { get; set; }
        public string pollution_no { get; set; }
        public DateTime pollution_expiry { get; set; }
        public string vehicle_owner { get; set; }
        public string vehicle_model { get; set; } 
        public int assigned_driverID { get; set; } 
        //public int route_id { get; set; }
        public bool IsActive { get; set; } = true;
        public string school_id { get; set; }
        public string? IMEI_no { get; set; } 
        public string? GPS_Username { get; set; } 
        public string? API_URL { get; set; } 
        public string? Status { get; set; } 
        public string? Data_Key { get; set; } 
        public DateTime LastUpdated { get; set; } 
    }

    [Table("VehicleRouteMapping")]
    public class VehicleRouteMapping
    {
        [Key]
        public int mapping_id { get; set; } 
        public int vehicle_id { get; set; }
        [ForeignKey("vehicle_id")]
        public Vehicles vehicle { get; set; }
        public int route_id { get; set; }
        [ForeignKey("route_id")]
        public TransportRoutes route { get; set; }
        public int stop_id { get; set; }
        [ForeignKey("stop_id")]
        public TransportStops stop { get; set; }
        public DateTime assigned_date { get; set; }   
        public bool isActive { get; set; } = true;
        public string school_id { get; set; }
    }

    [Table("Drivers")]
    public class Drivers
    {
        [Key]
        public int driver_id { get; set; }
        public string name { get; set; }
        public string dob { get; set; }
        public string license_no { get; set; }
        public string phoneNumber { get; set; } 
        public string address { get; set; }
        public DateTime joiningDate { get; set; }
        public string Photo { get; set; }
        public string school_id { get; set; }
        public DateTime CreateDate { get; set; }
    }

    [Table("TransportAssignments")]
    public class TransportAssignments
    {
        [Key]
        public int assignment_id { get; set; }
        public int student_id { get; set; }
        public int route_id { get; set; }
        public int stop_id { get; set; }
        public int vehicle_id { get; set; }
        public int driver_id { get; set; }
        public DateTime assignedDate { get; set; }
        public bool isActive { get; set; } = true;
        public string session { get; set; }
        public string school_id { get; set; }
    }

    [Table("TransportFees")]
    public class TransportFees
    {
        [Key]
        public int fee_id { get; set; }
        public int student_id { get; set; }
        public int route_id { get; set; }
        public int stop_id { get; set; }
        public int month { get; set; } // 1-12
        public int year { get; set; }
        public decimal amount { get; set; }
        public bool paid { get; set; } = false;
        public DateTime paymentDate { get; set; }
        public string receiptNo { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }

    public class VehicleRouteMappingDTOs
    { 
        public int VehicleId { get; set; }
        public Vehicles Vehicle { get; set; }

        public int RouteId { get; set; }
        public TransportRoutes Route { get; set; }

        public int StopId { get; set; }
        public TransportStops Stop { get; set; }
    }

    public class RouteStopPair
    {
        public int route_id { get; set; }
        public int stop_id { get; set; }
    }





}
