using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Controllers.Subjects;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Leave___Gallery;

namespace SchoolERP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class GalleryController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private static ILogger<GalleryController> _logger;
        private readonly IWebHostEnvironment _env;

        public GalleryController(SchoolERPContext context, ILogger<GalleryController> logger, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        #region Gallery Category Operation

        [HttpGet("get-gallery-category")]
        public async Task<IActionResult> getgalleryCategory(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            } 
            var category = await _context.galleryCategories.Where(sch => sch.school_id == school_id && sch.isActive == true).ToListAsync();
             
            
            return Ok(category);    
        }
        
        [HttpGet("get-gallery-category-by-id")]
        public async Task<IActionResult> getgalleryCategorybyId(string school_id,int cat_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            } 
            galleryCategory category = await _context.galleryCategories.Where(sch => sch.school_id == school_id && 
            sch.category_id == cat_id && sch.isActive == true).FirstOrDefaultAsync();
             
            
            return Ok(category);    
        }

        [HttpPost("insert-gallery-category")]
        public async Task<IActionResult> insertgalleryCategory(string school_id,[FromBody] galleryCategory category)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            }

            if(category.category_id == 0)
            {
                galleryCategory cat = new galleryCategory
                {
                    category_name = category.category_name,
                    isActive = category.isActive,
                    created_at = DateTime.Now,
                    updated_at = DateTime.Now,
                    school_id = category.school_id, 
                };

                _context.Add(cat);
                await _context.SaveChangesAsync();
                return Ok(cat); 
            }
            else
            {
                var category1 = await _context.galleryCategories
                    .Where(gc => gc.school_id == category.school_id && gc.category_id == category.category_id).FirstOrDefaultAsync();
                category1.category_name = category.category_name; 
                category1.updated_at = DateTime.Now; 
                await _context.SaveChangesAsync();
                return Ok(category1);
            }

            
            

        }

        [HttpDelete("delete-gallery-category")]
        public async Task<IActionResult> deletegalleryCategory(string school_id,int cat_id)
        {
            if (string.IsNullOrEmpty(school_id) || cat_id == 0)
            {
                return BadRequest("SChool Id and id is mendatory fields! ");
            }


            var category = await _context.galleryCategories.Where(c => c.school_id == school_id && c.category_id == cat_id).FirstOrDefaultAsync();
            category.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(category); 
        }

        #endregion


        #region Image Gallery Operation

        [HttpGet("get-image-with-category")]
        public async Task<IActionResult> getImageWCategory(string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School Id is null. ");
            }
            var galleryCategory = await _context.galleryCategories.Where(gc => gc.school_id == school_id &&
            gc.isActive == true).Include(gc=> gc.imageGalleries.Where(ig => ig.isActive == true)).ToListAsync();

            return Ok(galleryCategory);


        }

        [HttpGet("get-image-gallery")]
        public async Task<IActionResult> getimageGallery(string school_id,int cat_id)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            } 
            var img_cat = await _context.imageGalleries.Where(sch => sch.school_id == school_id && sch.category_id == cat_id && sch.isActive == true).ToListAsync();
             
            
            return Ok(img_cat);    
        }

        [HttpPost("insert-image-gallery")]
        public async Task<IActionResult> insertimageGallery( [FromForm] int img_id, [FromForm] int category_id 
            ,[FromForm] string school_id,[FromForm] IFormFile image)
        {
            if (string.IsNullOrEmpty(school_id))
            {
                return BadRequest("School_id is not Avaiable");
            }
            if (image == null || image.Length == 0)
            {
                return BadRequest("No file uploaded.");
            }

            string folder = Path.Combine(_env.WebRootPath,"api","uploads",school_id,"gallery");
            if (!Directory.Exists(folder))
            {
                Directory.CreateDirectory(folder);
            }

            string extension = Path.GetExtension(image.FileName);
            string cleanFilePath = Path.GetFileNameWithoutExtension(image.FileName);
            string fileName = $"{cleanFilePath}_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMMdd-HHmmss}{extension}";
            var filepath = Path.Combine(folder, fileName);

            using (var stream = new FileStream(filepath, FileMode.Create))
            {
                await image.CopyToAsync(stream);
            }
             
            imageGallery cat = new imageGallery
            {
                img_url = fileName,
                category_id = category_id,
                isActive = true,
                uploaded_at = DateTime.Now,
                school_id = school_id,
            };
            
            _context.Add(cat);
            await _context.SaveChangesAsync();
            return Ok(cat);  
        }

        [HttpDelete("delete-image-gallery")]
        public async Task<IActionResult> deleteimageGallery(string school_id,int img_id)
        {
            if (string.IsNullOrEmpty(school_id) || img_id==0)
            {
                return BadRequest("SChool Id and id is mendatory fields! ");
            }


            var category = await _context.imageGalleries.Where(c => c.school_id == school_id && c.img_id == img_id).FirstOrDefaultAsync();
            category.isActive = false;
            await _context.SaveChangesAsync();
            return Ok(category); 
        }

        #endregion

        [HttpGet("get-school-all-images")]
        public async Task<IActionResult> GetImages(string school_id)
        { 
            var webRoot = _env.WebRootPath;
             
            var baseDirectory = System.IO.Path.Combine(webRoot, "api", "uploads", school_id);
             
            if (!Directory.Exists(baseDirectory))
            {
                return NotFound("School directory not found.");
            }
             
            var foldersToCheck = Directory.GetDirectories(baseDirectory)
                                          .Select(d => new DirectoryInfo(d).Name)
                                          .ToList();




            List<folder> data = new List<folder>();
            foreach (var folderName in foldersToCheck)
            {
                folder folder = new folder();
                folder.folder_name = folderName;
                List<imageURLS> imageURLs = new List<imageURLS>();
                var folderPath = System.IO.Path.Combine(baseDirectory, folderName);
                 
                if (Directory.Exists(folderPath))
                {
                    var imagesInFolder = Directory.EnumerateFiles(folderPath)
                        .Where(file => file.EndsWith(".jpg") || file.EndsWith(".png") || file.EndsWith(".jpeg")) 
                        .Select(file => new imageURLS
                        {
                            url = Path.GetFileName(file)
                            //url = _env.WebRootPath + "/" + "api" + "/" + "uploads" + "/" + school_id + "/" + folder + Path.GetFileName(file)
                        });
                     
                    imageURLs.AddRange(imagesInFolder);
                }
                folder.images = imageURLs;
                data.Add(folder);
            }
             
            return Ok(data);
        }

        public class folder
        {
            public string folder_name { get; set; }
            public List<imageURLS> images { get; set; }
        }

        public class imageURLS
        {
            public string url { get; set; }
        }

    }
}
