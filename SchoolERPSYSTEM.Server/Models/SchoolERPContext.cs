using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;

namespace SchoolERPSYSTEM.Server.Models
{
    public class SchoolERPContext : DbContext
    {
        public SchoolERPContext(DbContextOptions<SchoolERPContext> options) : base(options) { }


        //superAdmin
        public DbSet<SuperAdminLogin> SuperAdminLogin { get; set; }

        //school
        public DbSet<Schools> schools { get; set; }
        public DbSet<SchoolDto> schoolDtos { get; set; }

        public DbSet<TbFacultymaster> TbFacultymasters { get; set; }
        public DbSet<TbDesignation> TbDesignations { get; set; }
        public DbSet<DesigMapping> DesigMappings { get; set; }
        public DbSet<Module> Modules { get; set; }
        public DbSet<SubModule> subModules { get; set; }

        public DbSet<LoginRequest> loginRequests { get; set; }

        public DbSet<Student_Other_info> student_Other_Infos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // You can configure additional relationships or constraints here

            base.OnModelCreating(modelBuilder);
        }


    }
}
