using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace SchoolERP.Server.Models
{

    public class CityState
    {

    }

    [Table("state_list")]
    public class State
    {
        [Key]
        public int id { get; set; }
        public int state_id { get; set; }
        public string state { get; set; }
    }
}
