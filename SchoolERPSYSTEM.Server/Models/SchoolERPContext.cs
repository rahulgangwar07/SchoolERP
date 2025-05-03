using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERPSYSTEM.Server.Models
{
    public class SchoolERPContext : DbContext
    {
        public SchoolERPContext(DbContextOptions<SchoolERPContext> options) : base(options) { }


        //superAdmin
        public DbSet<SuperAdminLogin> SuperAdminLogin { get; set; }



        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // You can configure additional relationships or constraints here

            base.OnModelCreating(modelBuilder);
        }


    }
}
