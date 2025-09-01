using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Configurations;

namespace SchoolERP.Server.Controllers.Configuration
{
    [Route("api/[controller]")]
    [ApiController]
    public class PermissionController : ControllerBase
    {
        private SchoolERPContext _context;

        public PermissionController(SchoolERPContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] string school_id, int desig_id, string route)
        {
            if (string.IsNullOrEmpty(school_id) || desig_id == 0 || string.IsNullOrEmpty(route))
            {
                return BadRequest("You are not giving mendatory Data! ");
            }

            int module_id = await _context.subModules.Where(sm => sm.submodule_route == route).Select(sm => sm.module_id).FirstOrDefaultAsync();

            int permission = await _context.rolesPermissions.Where(rp => rp.school_id == school_id && rp.desig_id == desig_id && rp.module_id == module_id)
                .Select(rp => rp.permission_id).FirstOrDefaultAsync();
            if (permission == 0)
            {
                chkPermissions chk = new chkPermissions
                {
                    canCreate = false,
                    canView = false,
                    canEdit = false,
                    canDelete = false,
                    triggered = false
                };
                return Ok(chk);
            }
            else
            {
                var pmission = await _context.Permissions.Where(p => p.permission_id == permission).FirstOrDefaultAsync();

                chkPermissions chk = new chkPermissions
                {
                    canCreate = pmission.p_create,
                    canView = pmission.p_view,
                    canEdit = pmission.p_edit,
                    canDelete = pmission.p_delete,
                    triggered = false
                };
                return Ok(chk);
            }
        }


        [HttpGet("getModuleForPermission")]
        public async Task<IActionResult> getModuleForPermission(string school_Id)
        {
            if (string.IsNullOrEmpty(school_Id))
            {
                return BadRequest("School Id is null");
            }

            var designations = await _context.TbDesignations.Where(desig => desig.designation_id != 1).ToListAsync();
            int[] niglateIds = [1, 10, 26];
            var modules = await _context.Modules.Where(mm => !niglateIds.Contains(mm.module_id)).ToListAsync();
            var roles_permission = await _context.rolesPermissions.Where(sm => sm.school_id == school_Id).ToListAsync();
            var permissions = await _context.Permissions.ToListAsync();

            List<designationsDTOs> designationDTOs = new List<designationsDTOs>();

            foreach (var des in designations)
            {
                designationsDTOs os = new designationsDTOs();
                os.des_id = des.designation_id;
                os.des_title = des.designation_name;
                List<p_modulesDTOs> p_Modules = new List<p_modulesDTOs>();
                foreach (var mod in modules)
                {
                    p_modulesDTOs p_ = new p_modulesDTOs();
                    p_.module_id = mod.module_id;
                    p_.module_name = mod.module_name;
                    int permissionID = roles_permission.Where(d => d.desig_id == des.designation_id && d.module_id == mod.module_id).Select(p => p.permission_id).FirstOrDefault();

                    permissionsDTOs permissionsDTOs = new permissionsDTOs();
                    if (permissionID == 0)
                    {
                        permissionsDTOs.view = false;
                        permissionsDTOs.create = false;
                        permissionsDTOs.edit = false;
                        permissionsDTOs.delete = false;
                        p_.assigned = false;
                    }
                    else
                    {
                        var perm = permissions.Where(p => p.permission_id == permissionID).First();
                        permissionsDTOs.view = perm.p_view;
                        permissionsDTOs.create = perm.p_create;
                        permissionsDTOs.edit = perm.p_edit;
                        permissionsDTOs.delete = perm.p_delete;
                        p_.assigned = true;
                    }
                    p_.permissions = permissionsDTOs;
                    p_Modules.Add(p_);
                }
                os.modules = p_Modules;
                designationDTOs.Add(os);
            }

            return Ok(designationDTOs);
        }

        [HttpPost("assignsubModule")]
        public async Task<IActionResult> assignModule(string school_id, int desig_id, int module_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id) || desig_id == 0 || module_id == 0)
                {
                    return BadRequest("Mendatory fields in not verified.");
                }

                int[] submodule_ids = await _context.subModules.Where(sm => sm.module_id == module_id && sm.status == true).Select(s => s.submodule_id).ToArrayAsync();
                string ids = string.Join(",", submodule_ids);

                RolesPermission roles = new RolesPermission
                {
                    desig_id = desig_id,
                    module_id = module_id,
                    submodule_id = ids,
                    permission_id = 16,
                    created_date = DateTime.Now,
                    school_id = school_id
                };
                _context.Add(roles);
                await _context.SaveChangesAsync();
                return Ok(roles);
            }
            catch (Exception ex)
            {
                return StatusCode(500, ex.Message);
            }
        }

        [HttpPost("postPermissions")]
        public async Task<IActionResult> postPermissions(string school_id, int desig_id, [FromBody] List<p_modulesDTOs> module)
        {
            if (string.IsNullOrEmpty(school_id) || desig_id == 0)
            {
                return BadRequest("Please fill mandatory fields!");
            }

            List<int> moduleIds = module.Select(m => m.module_id).ToList();

            List<RolesPermission> roles_permission = await _context.rolesPermissions
                .Where(rP => rP.desig_id == desig_id && moduleIds.Contains(rP.module_id) && rP.school_id == school_id)
                .ToListAsync();

            if (roles_permission.Count > 0)
            {
                foreach (var mod in module)
                {
                    int permissionId = ConvertPermissionsToInteger(mod.permissions);

                    var roles = roles_permission.FirstOrDefault(rp => rp.module_id == mod.module_id);

                    if (roles != null)
                    {
                        roles.permission_id = permissionId;
                    }
                }

                // Save changes to the database
                await _context.SaveChangesAsync();
            }

            return Ok();
        }


        public static int ConvertPermissionsToInteger(permissionsDTOs permissions)
        {
            int permissionId = 0;

            if (permissions.view) permissionId |= 1 << 0;
            if (permissions.create) permissionId |= 1 << 1;
            if (permissions.edit) permissionId |= 1 << 2;
            if (permissions.delete) permissionId |= 1 << 3;

            return permissionId = permissionId == 0 ? 16 : permissionId;


            //2 -> 10
            //1  -> 1
            //3 -> 011
            //4 -> 100
            //7 -> 0111
            //8 -> 1000
        }

    }


}
