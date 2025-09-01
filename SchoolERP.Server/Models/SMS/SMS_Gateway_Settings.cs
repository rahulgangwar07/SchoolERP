using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models.SMS
{
    [Table("SMS_Gateway_Settings")]
    public class SMS_Gateway_Settings
    {
        [Key]
        public int setting_id { get; set; }
        public string school_id { get; set; }
        public bool sms_enabled { get; set; } = true;
        public int sms_service { get; set; }
        public bool voice_sms_enabled { get; set; } = true;
        public bool forget_password_sms_enabled { get; set; } = true;
        public string sms_username { get; set; }
        public string? sms_password { get; set; }
        public string? primary_sender_id { get; set; }
        public string? secondary_sender_id { get; set; }
        public string? api_url { get; set; }
        public string? delivery_api_url { get; set; }
        public string? check_balance_api_url { get; set; }
        public int? route_id { get; set; }
        public string api_status { get; set; } = "Enabled";
        public DateTime created_at { get; set; } = DateTime.Now;
        public DateTime updated_at { get; set; } = DateTime.Now;
        public string created_by { get; set; }
        public string updated_by { get; set; }
    }
}
