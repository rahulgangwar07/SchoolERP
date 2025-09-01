using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Text.Json.Serialization;

namespace SchoolERP.Server.Models.SMS
{
    [Table("SMSLog")]
    public class SMSLog
    {
        [Key]
        public int sms_id { get; set; }
        public string template_id { get; set; }
        public string sentby { get; set; }
        public string sentTo { get; set; }
        public string message { get; set; }
        public DateTime sent_At { get; set; }
        public string status { get; set; }
        public string school_id { get; set; }
        public string created_by { get; set; }
        public string updated_by { get; set; } 
        public ICollection<SMSRecipients> SMSRecipients { get; set; }
    }

    [Table("SMSRecipients")]
    public class SMSRecipients
    {
        [Key]
        public int recipient_id { get; set; }
        [ForeignKey("sms_id")]
        public int sms_id { get; set; }
        public string sent_to { get; set; }
        public int user_id { get; set; } 
        public string user_type { get; set; } 
        public string status { get; set; }
        public string message { get; set; }
        public DateTime delivered_at { get; set; }
        [ForeignKey(nameof(sms_id))]
        [JsonIgnore]
        public SMSLog SMSLog { get; set; }
    }

    public class smsLogDtos
    {
        public int id{ get; set; }
        public string template_id { get; set; }
        public string sentby { get; set; }
        public string messageTo { get; set; }
        public string orignal_Message { get; set; }
        public string? mobileNos { get; set; } 
        public string? class_ids { get; set; } 
    }

    public class SMSLogDTOsnew
    { 
        public int sms_id { get; set; }
        public string template_id { get; set; }
        public string sentby { get; set; }
        public string sentTo { get; set; }
        public string message { get; set; }
        public DateTime sent_At { get; set; }
        public string status { get; set; }
        public string school_id { get; set; }
        public string created_by { get; set; }
        public string updated_by { get; set; }
        public int sms_count { get; set; }
        public List<SMSRecipientsDTOs> SMSRecipients { get; set; }
    }

    public class SMSRecipientsDTOs
    {
        public int recipient_id { get; set; }
        public int sms_id { get; set; }
        public string sent_to { get; set; }
        public int user_id { get; set; }
        public string user_type { get; set; }
        public string status { get; set; }
        public string message { get; set; }
        public DateTime delivered_at { get; set; }
    }
}
