using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using SchoolERP.Server.Controllers.Configuration;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Student_Models;
using System.Linq;

namespace SchoolERP.Server.Controllers.Student_Report
{
    [Route("api/[controller]")]
    [ApiController]
    public class StaticsReportController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<SchoolController> _logger;

        public StaticsReportController(SchoolERPContext context, ILogger<SchoolController> logger)
        {
            _context = context;
            _logger = logger;
        }

        [HttpGet("getStaticsReport")]
        public async Task<IActionResult> getStaticsReport([FromQuery] string school_id)
        {
            // Get the data from the database by joining the necessary tables
            var data = _context.tb_studentmasters.Where(ts => ts.school_id == school_id)
                .Join(_context.student_Other_Infos,
                    sm => sm.uid,si => si.uid,(sm, si) => new { sm.class_id, si.caste, si.gender }).ToList();

        
            var genders = data.Select(s => s.gender).Distinct().ToList();
            var castes = data.Select(s => s.caste).Distinct().ToList();

            var classes = _context.classNames.Where(sm => sm.school_id == school_id && sm.status == true).ToList();

            var classIds = new HashSet<int>(classes.Select(c => c.class_id));

            var clsgrp = data.Where(cls => classIds.Contains((int)cls.class_id)).GroupBy(cls => cls.class_id).ToList();
             
            List<reportData> reportDataList = new List<reportData>();

            foreach (var cls in clsgrp)
            {
                 
                reportData report = new reportData
                {
                    className = classes.Where(c => c.class_id == cls.Key).Select(c => c.class_name).FirstOrDefault(),  
                    categories = new categories
                    {
                        data = new datawithgender[castes.Count]   
                    },
                    totalStudents = cls.Count().ToString()   
                };

                // Iterate over each caste to populate the datawithgender array
                for (int i = 0; i < castes.Count; i++)
                {
                    // Create datawithgender for each category (caste)
                    var caste = castes[i];
                    var studentsInCaste = cls.Where(s => s.caste == caste).ToList();

                    // Calculate the count of boys, girls, and total for this caste
                    var boysCount = studentsInCaste.Count(s => s.gender == "Male");
                    var girlsCount = studentsInCaste.Count(s => s.gender == "Female");
                    var totalCount = boysCount + girlsCount;

                     
                    report.categories.data[i] = new datawithgender
                    {
                        catName = caste,   
                        data = new stuData
                        {
                            name = new string[] { "boys", "girls", "total" },  
                            quantity = new int[] { boysCount, girlsCount, totalCount }  
                        }
                    };
                }

                // Add the report data for the class to the list
                reportDataList.Add(report);
            }

            // Return the report data as the response
            return Ok(reportDataList);
        }




    }
}
