using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class ModuleMappingController : ControllerBase
    {
        private SchoolERPContext _context;

        public ModuleMappingController(SchoolERPContext context)
        {
            _context = context;
        }

        [HttpGet("getModule/{user_id}")]
        public async Task<IActionResult> getModule(int user_id, string school_id)
        {
            int designation_id = await _context.DesigMappings.Where(dm => dm.faculty_id == user_id && dm.school_id == school_id).Select(dm => dm.designation_id).FirstOrDefaultAsync();

            if (designation_id == 0)
            {
                return NotFound("Designation not found for the given user.");
            }

            var roles = _context.rolesPermissions.Where(u => u.desig_id == designation_id && u.school_id == school_id).ToList();

            if (roles == null || !roles.Any())
            {
                return NotFound("No roles found for this designation.");
            }

            var moduleIDs = roles.Select(rp => rp.module_id).ToList();
            var submoduleIdsList = roles.SelectMany(role => role.submodule_id.Split(',').Select(int.Parse)).ToList();

            // Correct query to include submodules
            var modules = await _context.Modules
                .Where(m => moduleIDs.Contains(m.module_id))
                .Include(m => m.SubModules)
                .ToListAsync();


            var modulesWithSubModules = new List<ModuleWithSubModulesDTO>();

            foreach (var module in modules)
            {
                // Get parent submodules (those with parentsubmodule_id == 0)
                var parentSubmodules = module.SubModules
                    .Where(submodule => submoduleIdsList.Contains(submodule.submodule_id) && submodule.status == true && submodule.parentsubmodule_id == 0)
                    .ToList();

                // Get child submodules (those with parentsubmodule_id != 0)
                var childSubmodules = module.SubModules
                    .Where(submodule => submoduleIdsList.Contains(submodule.submodule_id) && submodule.status == true && submodule.parentsubmodule_id != 0)
                    .ToList();


                var items = parentSubmodules.Select(x => new SubModuleDTO
                {
                    submodule_id = x.submodule_id,
                    module_id = x.module_id,
                    submodule_name = x.submodule_name,
                    submodule_route = x.submodule_route,
                    description = x.description,
                    created_by = x.created_by,
                    created_date = x.created_date,
                    icon = x.icon,
                    parentsubmodule_id = x.parentsubmodule_id,
                    ChildSubModules = childSubmodules.Where(y => y.parentsubmodule_id == x.submodule_id).ToList()
                });


                // Map Module to DTO
                var moduleDTO = new ModuleWithSubModulesDTO
                {
                    module_id = module.module_id,
                    module_name = module.module_name,
                    route = module.route,
                    description = module.description,
                    icon = module.icon,
                    SubModules = items.Select(p => new SubModuleWithChildrenDTO
                    {
                        submodule_id = p.submodule_id,
                        submodule_name = p.submodule_name,
                        submodule_route = p.submodule_route,
                        description = p.description,
                        icon = p.icon,
                        ChildSubModules = p.ChildSubModules?.Select(c => new SubModuleWithChildrenDTO
                        {
                            submodule_id = c.submodule_id,
                            submodule_name = c.submodule_name,
                            submodule_route = c.submodule_route,
                            description = c.description,
                            icon = c.icon
                        }).ToList()
                    }).ToList()
                };

                modulesWithSubModules.Add(moduleDTO);
            }

            if (modulesWithSubModules == null || !modulesWithSubModules.Any())
            {
                return NotFound("No modules found for the given user.");
            }

            return Ok(modulesWithSubModules);
        }


        [HttpGet("get2Module/{id}")]
        public async Task<IActionResult> get2Module(int id)
        {
            var item = await _context.Modules.FirstOrDefaultAsync(m => m.module_id == id);
            if (item == null)
            {
                return NotFound();
            }
            return Ok(item);
        }

        [HttpPost("postModule")]
        public async Task<IActionResult> postModule([FromBody] Module module)
        {
            if (module == null)
            {
                return BadRequest("Data is not posted in currect way");
            }
            _context.Modules.Add(module);
            await _context.SaveChangesAsync();
            return CreatedAtAction(nameof(postModule), new { id = module.module_id }, module);
        }



        [HttpGet("getmodulewithSubmodule")]
        public async Task<IActionResult> GetModuleWithSubModule()
        {
            // Load all modules, excluding module with module_id 10
            var modules = await _context.Modules
                .Where(m => m.module_id != 10)
                .Include(s => s.SubModules.Where(s => s.status == true))
                .ToListAsync();

            if (modules == null)
            {
                return BadRequest("Modules not found");
            }

            List<ModuleWithSubModulesDTO> moduleDTOs = new List<ModuleWithSubModulesDTO>();
            foreach (var module in modules)
            {
                var moduleDTO = new ModuleWithSubModulesDTO
                {
                    module_id = module.module_id,
                    module_name = module.module_name,
                    route = module.route,
                    description = module.description,
                    icon = module.icon
                };

                // Get the child submodules for the module and organize them in a tree-like structure
                var subModuleTree = GetSubModuleTree(module.SubModules);
                moduleDTO.SubModules = subModuleTree;

                moduleDTOs.Add(moduleDTO);
            }

            return Ok(moduleDTOs);
        }

        private List<SubModuleWithChildrenDTO> GetSubModuleTree(IEnumerable<SubModule> subModules)
        {
            // Create a dictionary to group submodules by their parent ID
            var subModulesByParentId = subModules
                .GroupBy(sm => sm.parentsubmodule_id)
                .ToDictionary(g => g.Key, g => g.ToList());

            // Function to build the tree recursively
            List<SubModuleWithChildrenDTO> BuildTree(int parentId)
            {
                var subModulesForParent = subModulesByParentId.GetValueOrDefault(parentId, new List<SubModule>());
                var subModuleTree = new List<SubModuleWithChildrenDTO>();

                foreach (var subModule in subModulesForParent)
                {
                    var subModuleDTO = new SubModuleWithChildrenDTO
                    {
                        submodule_id = subModule.submodule_id,
                        submodule_name = subModule.submodule_name,
                        submodule_route = subModule.submodule_route,
                        description = subModule.description,
                        icon = subModule.icon,
                        ChildSubModules = BuildTree(subModule.submodule_id) // Recursive call for children
                    };

                    subModuleTree.Add(subModuleDTO);
                }

                return subModuleTree;
            }

            return BuildTree(0); // Root submodules have a parentId of 0
        }


        [HttpGet("getfacultyModule/{des_id}")]
        public async Task<IActionResult> getfacultyModule(int des_id, string school_id)
        {
            if (des_id == 0)
            {
                return BadRequest("Designation id is not found");
            }


            var modules = await _context.rolesPermissions
                .Where(rp => rp.desig_id == des_id && rp.school_id == school_id)
                .ToListAsync();
            List<AccessRolesPermission> _arpermission = new List<AccessRolesPermission>();
            foreach (var module in modules)
            {
                List<int> ints = new List<int>();
                AccessRolesPermission arp = new AccessRolesPermission();
                arp.role_permission_id = module.role_permission_id;
                arp.desig_id = module.desig_id;
                arp.module_id = module.module_id;
                arp.permission_id = module.permission_id;
                arp.submodule_id = ints;
                if (!string.IsNullOrEmpty(module.submodule_id))
                {
                    ints = module.submodule_id
                        .Split(',')
                        .Select(submodule => int.Parse(submodule.Trim()))
                        .ToList();

                    arp.submodule_id = ints;
                }
                _arpermission.Add(arp);
            }

            return Ok(_arpermission);
        }

        [HttpPost("addsubModule")]
        public async Task<IActionResult> addsubModule([FromBody] AddSubModuleDto request)
        {
            if (request.subIds == null || request.subIds.Length == 0 || request.desig_id <= 0 || string.IsNullOrEmpty(request.school_id))
            {
                return BadRequest("Invalid submodule IDs, designation ID, or school ID.");
            }

            foreach (var subid in request.subIds)
            {
                var subModule = await _context.subModules.FirstOrDefaultAsync(id => id.submodule_id == subid);
                if (subModule == null)
                {
                    return BadRequest($"Submodule with ID {subid} not found.");
                }

                var module = await _context.rolesPermissions
                    .FirstOrDefaultAsync(xm => xm.module_id == subModule.module_id && xm.desig_id == request.desig_id && xm.school_id == request.school_id);

                if (module == null)
                {
                    var roles = new RolesPermission
                    {
                        desig_id = request.desig_id,
                        module_id = subModule.module_id,
                        submodule_id = subid.ToString(),
                        permission_id = 12,
                        created_date = DateTime.Now,
                        school_id = request.school_id
                    };

                    _context.rolesPermissions.Add(roles);
                    await _context.SaveChangesAsync();
                }
                else
                {
                    var submoduleIds = module.submodule_id.Split(',').Select(sub => int.Parse(sub.Trim())).ToHashSet();

                    if (!submoduleIds.Contains(subid))
                    {
                        submoduleIds.Add(subid);
                    }

                    module.submodule_id = string.Join(",", submoduleIds.OrderBy(id => id));
                    module.created_date = DateTime.Now;

                    await _context.SaveChangesAsync();
                }
            }

            return Ok("Submodules processed successfully.");
        }

        [HttpDelete("deleteModule/{module_id}/{subid}/{desig_id}")]
        public async Task<IActionResult> deleteModule(int module_id, int subid, int desig_id, string school_id)
        {

            // Initialize the list with the submodule ID to be removed
            List<int> Ids = new List<int> { subid };

            var Submodules = await _context.subModules
                .Where(sm => sm.module_id == module_id && sm.parentsubmodule_id == subid && sm.status == true)
                .ToListAsync();

            Ids.AddRange(Submodules.Select(s => s.submodule_id).ToList());


            var Permission = await _context.rolesPermissions
    .Where(rp => rp.module_id == module_id && rp.desig_id == desig_id && rp.school_id == school_id).Select(rp => rp.submodule_id).FirstOrDefaultAsync();


            if (Permission == null)
            {
                return NotFound("Roles permission not found.");
            }
            List<int> rolesPermission = Permission.Split(',').Select(int.Parse).ToList();


            rolesPermission.RemoveAll(permission => Ids.Contains(permission));


            string str = string.Join(",", rolesPermission);

            var permission1 = await _context.rolesPermissions
        .Where(rp => rp.module_id == module_id && rp.desig_id == desig_id && rp.school_id == school_id)
        .FirstOrDefaultAsync();

            if (permission1 == null)
            {
                return NotFound("Permission entry not found.");
            }

            if (string.IsNullOrEmpty(str) || str == "0")
            {
                _context.rolesPermissions.Remove(permission1);
            }
            else
            {
                permission1.submodule_id = str;
            }
            await _context.SaveChangesAsync();


            //var 
            return Ok(Ids);
        }

        [HttpPost("addAllModules/{module_id}/{desig_id}")]
        public async Task<IActionResult> addAllModules(int module_id, int desig_id, [FromQuery] string school_id, [FromBody] List<int> submoduleIds)
        {
            if (module_id == 0 || desig_id == 0)
            {
                return BadRequest("Invalid module or designation ID.");
            }

            if (submoduleIds == null || submoduleIds.Count == 0)
            {
                return BadRequest("Submodule IDs are required.");
            }

            string newstr = string.Join(",", submoduleIds);

            // Find submodule existing record in rolesPermissions for the given module and desig_id
            var item = await _context.rolesPermissions
                .Where(rp => rp.module_id == module_id && rp.desig_id == desig_id && rp.school_id == school_id)
                .FirstOrDefaultAsync();

            // Find child submodule existing record in rolesPermissions for the given module and desig_id
            List<int> Childsubmodule = await _context.subModules.Where(sm => sm.module_id == module_id && submoduleIds.Contains(sm.parentsubmodule_id)).Select(s => s.submodule_id).ToListAsync();
            if (Childsubmodule.Count > 0)
            {
                newstr += ",";
                newstr += string.Join(",", Childsubmodule);
            }


            // If no record exists, create a new one
            if (item == null)
            {
                var rpm = new RolesPermission
                {
                    desig_id = desig_id,
                    module_id = module_id,
                    permission_id = 16,
                    submodule_id = newstr,
                    created_date = DateTime.Now,
                    school_id = school_id
                };

                _context.rolesPermissions.Add(rpm);
                await _context.SaveChangesAsync();
                return Ok(new { submodule_ids = newstr });

            }

            // Update the existing record with the new submodule IDs
            item.submodule_id = newstr;
            await _context.SaveChangesAsync();
            return Ok(newstr);
        }


        [HttpDelete("deleteAllModule/{module_id}/{desig_id}")]
        public async Task<IActionResult> deleteAllModule(int module_id, int desig_id, [FromQuery] string school_id)
        {
            if (module_id == 0 || desig_id == 0)
            {
                return BadRequest("Invalid module or designation ID.");
            }

            // Find the rolesPermissions entry to delete
            var item = await _context.rolesPermissions
                .Where(rP => rP.module_id == module_id && rP.desig_id == desig_id && rP.school_id == school_id)
                .FirstOrDefaultAsync();

            if (item == null)
            {
                return NotFound("No matching record found.");
            }

            // Remove the item and save changes
            _context.rolesPermissions.Remove(item);
            await _context.SaveChangesAsync();

            return Ok(item);
        }



    }
}
