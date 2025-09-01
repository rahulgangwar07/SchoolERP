namespace SchoolERP.Server.Models.Account
{
    public class fee_procedures
    {

    }

    public class fetch_FeeHead_Mappings
    {
        public int fee_head_mapping_id { get; set; }
        public int fee_type_id { get; set; }
        public string fee_type_name { get; set; }
        public int fee_head_id { get; set; }
        public string fee_head_name { get; set; }
        public int installment_id { get; set; }
        public int class_id { get; set; }
        public int instNo { get; set; }
        public string instMonth { get; set; }
        public DateTime? dueDate { get; set; }
        public int amount { get; set; }
        public string session { get; set; }
        public string school_id { get; set; }
    }
}
