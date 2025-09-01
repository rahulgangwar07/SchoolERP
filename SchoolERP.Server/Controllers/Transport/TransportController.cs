using DocumentFormat.OpenXml.Office2010.Excel;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using SchoolERP.Server.Models;
using SchoolERP.Server.Models.Transport;
using System.Linq;
using System.Text.Json;
using static SchoolERP.Server.Controllers.GalleryController;
using static System.Net.Mime.MediaTypeNames;

namespace SchoolERP.Server.Controllers.Transport
{
    [Route("api/[controller]")]
    [ApiController]
    public class TransportController : ControllerBase
    {
        private readonly SchoolERPContext _context;
        private readonly ILogger<TransportController> _logger;
        private readonly IWebHostEnvironment _env;

        public TransportController(ILogger<TransportController> logger, SchoolERPContext context, IWebHostEnvironment env)
        {
            _context = context;
            _logger = logger;
            _env = env;
        }

        #region Transport Type

        [HttpGet("get-transport-routes")]
        public async Task<IActionResult> GetTransportRoutes(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))  return BadRequest("School Id is required Field!"); 

                var routes = await _context.transportRoutes.Where(tr => tr.school_id == school_id).ToListAsync();
                return Ok(routes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport routes");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-route")]
        public async Task<IActionResult> AddTransportRoute([FromBody] TransportRoutes route)
        {
            if (route == null || string.IsNullOrEmpty(route.route_name))
            {
                return BadRequest("Invalid transport route data.");
            }
            try
            {
                _context.transportRoutes.Add(route);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTransportRoutes), new { id = route.route_id }, route);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding transport route");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("update-transport-route/{id}")]
        public async Task<IActionResult> UpdateTransportRoute(string school_id, int id, [FromBody] TransportRoutes route)
        {
            if (route == null || id != route.route_id)
            {
                return BadRequest("Invalid transport route data.");
            }
            try
            {
                var existingRoute = await _context.transportRoutes.FindAsync(id);
                if (existingRoute == null)
                {
                    return NotFound("Transport route not found.");
                }
                existingRoute.route_name = route.route_name;
                existingRoute.route_Code = route.route_Code;
                existingRoute.description = route.description;
                existingRoute.start_location = route.start_location;
                existingRoute.end_location = route.end_location;
                existingRoute.aaplied_month = route.aaplied_month;
                existingRoute.maximum_stop_fare = route.maximum_stop_fare;
                _context.transportRoutes.Update(existingRoute);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating transport route");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-route/{id}")]
        public async Task<IActionResult> DeleteTransportRoute(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var route = await _context.transportRoutes.FindAsync(id);
                if (route == null)
                {
                    return NotFound("Transport route not found.");
                }
                _context.transportRoutes.Remove(route);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting transport route");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

        #region Transport Stops

        [HttpGet("get-transport-stops")]
        public async Task<IActionResult> GetTransportStops()
        {
            try
            {
                var stops = await _context.transportStops.ToListAsync();
                return Ok(stops);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport stops");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
         
        [HttpGet("get-transport-route-with-stops")]
        public async Task<IActionResult> GetTransportRouteWithStops([FromQuery] string school_id)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            try
            {
                var routesWithStops = await _context.transportRoutes
                    .Where(r => r.school_id == school_id)
                    .Select(r => new
                    {
                        Route = r,
                        Stops = _context.transportStops
                            .Where(s => s.route_id == r.route_id && s.school_id == school_id)
                            .ToList()
                    })
                    .ToListAsync();

                return Ok(routesWithStops);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport routes with stops");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
         
        [HttpGet("get-single-transport-route-with-stops/{routeId}")]
        public async Task<IActionResult> GetSingleTransportRouteWithStops([FromQuery] string school_id,int routeId)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is null.");

            try
            {
                var routesWithStops = await _context.transportRoutes
                    .Where(r => r.school_id == school_id && r.route_id == routeId)
                    .Select(r => new
                    {
                        Route = r,
                        Stops = _context.transportStops
                            .Where(s => s.route_id == r.route_id && s.school_id == school_id)
                            .ToList()
                    })
                    .FirstOrDefaultAsync();

                return Ok(routesWithStops);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport routes with stops");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpPost("add-transport-stop")]
        public async Task<IActionResult> AddTransportStop([FromBody] List<TransportStops> stop)
        {
            if (stop == null || stop.Count == 0 || stop.Any(s => string.IsNullOrEmpty(s.stop_name)))
            {
                return BadRequest("Invalid transport stop data.");
            }
            try
            {
                _context.transportStops.AddRange(stop);
                await _context.SaveChangesAsync();
                return Ok(stop);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding transport stop");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpPut("update-transport-stop")]
        public async Task<IActionResult> UpdateTransportStop(string school_id, [FromBody] List<TransportStops> stops)
        {
            if (string.IsNullOrEmpty(school_id)) 
                return BadRequest("School Id is required Field!");

            if (stops == null)
            {
                return BadRequest("Invalid transport stop data.");
            }
            try
            { 
                int route_id = stops.Select(s => s.route_id).FirstOrDefault();
                List<int> stopIdforUpdate = stops.Where(s => s.stop_id!=0).Select(s => s.stop_id).ToList();
                var updateStops = stops.Where(s => s.stop_id!=0).ToList();
                var insertStops = stops.Where(s => s.stop_id==0).ToList(); 
                var forDeletion = await _context.transportStops.Where(s => s.route_id == route_id && !stopIdforUpdate.Contains(s.stop_id)).ToListAsync();

                //List<int> missingStopIds = existingStopIds.Except(stopIdforUpdate).ToList();

                insertStops.ForEach(s =>
                {
                    s.route_id = route_id;
                    s.school_id = school_id;
                });

                _context.AddRange(insertStops);
                _context.UpdateRange(updateStops);
                _context.RemoveRange(forDeletion);

                await _context.SaveChangesAsync();


                //var existingStop = await _context.transportStops.FindAsync(id);
                //if (existingStop == null)
                //{
                //    return NotFound("Transport stop not found.");
                //}
                //existingStop.stop_name = stop.stop_name;
                //existingStop.amount = stop.amount;
                //existingStop.picktime = stop.picktime;
                //existingStop.stoptime = stop.stoptime;
                //existingStop.sequenceNo = stop.sequenceNo;
                //_context.transportStops.Update(existingStop);
                //await _context.SaveChangesAsync();
                return Ok(new
                {
                    inserted = insertStops.Count,
                    updated = updateStops.Count,
                    deleted = forDeletion.Count
                });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating transport stop");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-stop/{id}")]
        public async Task<IActionResult> DeleteTransportStop(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var stop = await _context.transportStops.FindAsync(id);
                if (stop == null)
                {
                    return NotFound("Transport stop not found.");
                }
                _context.transportStops.Remove(stop);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting transport stop");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

        #region Vehicle Types
        [HttpGet("get-transport-vehicle-types")]
        public async Task<IActionResult> GetTransportVehicleTypes(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");
                var vehicleTypes = await _context.vehicleTypes.Where(vT => vT.school_id == school_id && vT.isActive == true).ToListAsync();
                return Ok(vehicleTypes);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport vehicle types");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("get-transport-vehicle-for-list")]
        public async Task<IActionResult> GetTransportVehicleForList(string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");
                var vehicleList = await _context.vehicles.Where(vT => vT.school_id == school_id && vT.IsActive == true).Select(
                    v => new
                    {
                        Vehicle = v,
                        Driver = _context.drivers.Where(d => d.driver_id == v.assigned_driverID && d.school_id == school_id).FirstOrDefault(),
                        Vehicle_Model = _context.vehicleTypes.Where(d => d.vehicle_type_id == Convert.ToInt32(v.vehicle_model) && d.school_id == school_id).FirstOrDefault(),
                    }).ToListAsync();

     //           var routesWithStops = await _context.transportRoutes
     //.Where(r => r.school_id == school_id)
     //.Select(r => new
     //{
     //    Route = r,
     //    Stops = _context.transportStops
     //        .Where(s => s.route_id == r.route_id && s.school_id == school_id)
     //        .ToList()
     //})
     //.ToListAsync();
                return Ok(vehicleList);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport vehicle types");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-vehicle-type")]
        public async Task<IActionResult> AddVehicleType([FromBody] VehicleType vehicleType)
        {
            if (vehicleType == null || string.IsNullOrEmpty(vehicleType.model_name))
            {
                return BadRequest("Invalid vehicle type data.");
            }
            try
            {
                _context.vehicleTypes.Add(vehicleType);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTransportVehicleTypes), new { id = vehicleType.vehicle_type_id }, vehicleType);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding vehicle type");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("update-transport-vehicle-type/{id}")]
        public async Task<IActionResult> UpdateVehicleType(string school_id, int id, [FromBody] VehicleType vehicleType)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");

            if (vehicleType == null || id != vehicleType.vehicle_type_id)
            {
                return BadRequest("Invalid vehicle type data.");
            }
            try
            {
                var existingVehicleType = await _context.vehicleTypes.FindAsync(id);
                if (existingVehicleType == null)
                {
                    return NotFound("Vehicle type not found.");
                }
                existingVehicleType.model_name = vehicleType.model_name;
                existingVehicleType.model_type = vehicleType.model_type;
                _context.vehicleTypes.Update(existingVehicleType);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating vehicle type");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-vehicle-type/{id}")]
        public IActionResult DeleteVehicleType(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var vehicleType = _context.vehicleTypes.Find(id);
                if (vehicleType == null)
                {
                    return NotFound("Vehicle type not found.");
                }
                vehicleType.isActive = false;
                _context.vehicleTypes.Update(vehicleType);
                _context.SaveChanges();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting vehicle type");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

        #region Vehicles
        [HttpGet("get-transport-vehicles")]
        public async Task<IActionResult> GetVehicles(string school_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");
            try
            {
                var vehicles = await _context.vehicles.Include(v => v.vehicle_model).ToListAsync();
                return Ok(vehicles);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching vehicles");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("get-transport-vehicle-by-id/{vehicle_id}")]
        public async Task<IActionResult> GetVehicleSignle(string school_id,int vehicle_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");
            try
            {
                var vehicle = await _context.vehicles.Where(v => v.vehicle_id == vehicle_id).FirstOrDefaultAsync();
                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching vehicles");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("get-transport-vehicles-mapping/{vehicle_id}")]
        public async Task<IActionResult> GetVehiclesMappings(string school_id,int vehicle_id)
        {
            if (string.IsNullOrEmpty(school_id)) return BadRequest("School Id not found.");
            try
            {
                var vehicle = await _context.vehicleRouteMappings.Where(v => v.vehicle_id == vehicle_id)
                    .Include(s => s.vehicle).Include(s => s.route).Include(s => s.stop)
                    .Select(
                    s => new VehicleRouteMappingDTOs
                    {
                        VehicleId = s.vehicle_id,
                        Vehicle = s.vehicle,
                        RouteId = s.route_id,
                        Route = s.route,
                        StopId = s.stop_id,
                        Stop = s.stop

                    }).ToListAsync();
                return Ok(vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching vehicles");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-vehicle")]
        public async Task<IActionResult> AddVehicle(string school_id,[FromBody] Vehicles vehicle)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");
            if (vehicle == null || string.IsNullOrEmpty(vehicle.vehicle_number))
            {
                return BadRequest("Invalid vehicle data.");
            }
            try
            {
                _context.vehicles.Add(vehicle);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetVehicles), new { id = vehicle.vehicle_id }, vehicle);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding vehicle");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-vehicle-mapping/{vehicle_id}")]
        public async Task<IActionResult> AddTransportVehicleMapping(string school_id,int vehicle_id,List<RouteStopPair> routes)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");
            if(routes.Count == 0)
            {
                return Ok();
            }

            List<int> routeIds = routes.Select(r => r.route_id).ToList();   
            List<int> stopIds = routes.Select(r => r.stop_id).ToList();      

            var existingMapping = await _context.vehicleRouteMappings.Where(rM => rM.school_id == school_id && rM.vehicle_id == vehicle_id && routeIds.Contains(rM.route_id) && stopIds.Contains(rM.stop_id)).ToListAsync();

            var allMappings = await _context.vehicleRouteMappings.Where(rM => rM.school_id == school_id && rM.vehicle_id == vehicle_id && rM.isActive).ToListAsync();

            var oldData = allMappings.Where(rM => !routes.Any(r => r.route_id == rM.route_id && r.stop_id == rM.stop_id)).ToList();

            foreach (var old in oldData)
            {
                old.isActive = false;
                // optionally update other fields like updatedDate, updatedBy etc.
            }
            foreach (var routeStop in routes)
            {
                bool exists = existingMapping.Any(em => em.route_id == routeStop.route_id && em.stop_id == routeStop.stop_id);
                if (!exists)
                {
                    var newMapping = new VehicleRouteMapping
                    {
                        vehicle_id = vehicle_id,
                        route_id = routeStop.route_id,
                        stop_id = routeStop.stop_id,
                        assigned_date = DateTime.Now,
                        isActive = true,
                        school_id = school_id
                    };
                    _context.vehicleRouteMappings.Add(newMapping);
                }
            }

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpPut("update-transport-vehicle/{id}")]
        public async Task<IActionResult> UpdateVehicle(string school_id, int id, [FromBody] Vehicles vehicle)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");

            if (vehicle == null || id != vehicle.vehicle_id)
            {
                return BadRequest("Invalid vehicle data.");
            }
            try
            {
                var existingVehicle = await _context.vehicles.FindAsync(id);
                if (existingVehicle == null)
                {
                    return NotFound("Vehicle not found.");
                }
                existingVehicle.vehicle_number = vehicle.vehicle_number;
                existingVehicle.insurance_no = vehicle.insurance_no;
                existingVehicle.insurance_expiry = vehicle.insurance_expiry;
                existingVehicle.pollution_no = vehicle.pollution_no;
                existingVehicle.pollution_expiry = vehicle.pollution_expiry;
                existingVehicle.vehicle_owner = vehicle.vehicle_owner;
                existingVehicle.vehicle_model = vehicle.vehicle_model;
                existingVehicle.assigned_driverID = vehicle.assigned_driverID;
                existingVehicle.IMEI_no = vehicle.IMEI_no;
                existingVehicle.GPS_Username = vehicle.GPS_Username;
                existingVehicle.API_URL = vehicle.API_URL;
                existingVehicle.Status = vehicle.Status;
                existingVehicle.Data_Key = vehicle.Data_Key;
                existingVehicle.LastUpdated = DateTime.Now;
                _context.vehicles.Update(existingVehicle);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating vehicle");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-vehicle/{id}")]
        public async Task<IActionResult> DeleteVehicle(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var vehicle = await _context.vehicles.FindAsync(id);
                if (vehicle == null)
                {
                    return NotFound("Vehicle not found.");
                }
                _context.vehicles.Remove(vehicle);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting vehicle");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }
        #endregion

        #region Drivers
        [HttpGet("get-transport-drivers")]
        public async Task<IActionResult> GetDrivers()
        {
            try
            {
                var drivers = await _context.drivers.ToListAsync();
                return Ok(drivers);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching drivers");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpGet("get-transport-drivers-by-id/{driverID}")]
        public async Task<IActionResult> GetDriversById(int driverID, [FromQuery] string school_id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                {
                    return BadRequest("School ID is null.");
                }

                var driver = await _context.drivers
                    .Where(d => d.school_id == school_id && d.driver_id == driverID)
                    .FirstOrDefaultAsync();

                if (driver == null)
                {
                    return NotFound("Driver not found.");
                }

                return Ok(driver);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching driver by ID");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpPost("add-transport-driver")]
        public async Task<IActionResult> AddDriver(string school_id, [FromForm] string driver, [FromForm] IFormFile file)
        {
            if (string.IsNullOrEmpty(driver))
            {
                return BadRequest("Driver data is required.");
            }

            Drivers driverObj;
            try
            {
                driverObj = JsonSerializer.Deserialize<Drivers>(driver);
            }
            catch
            {
                return BadRequest("Invalid driver data format.");
            }

            if (string.IsNullOrEmpty(driverObj.name))
            {
                return BadRequest("Driver name is required.");
            }

            string fileName = "";
            // Optional: Process file if provided
            if (file != null && file.Length > 0)
            {
                var uploadPath = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "transport");
                if (!Directory.Exists(uploadPath))
                {
                    Directory.CreateDirectory(uploadPath);
                }

                string extension = Path.GetExtension(file.FileName);
                string baseFileName = Path.GetFileNameWithoutExtension(file.FileName);
                fileName = $"{baseFileName}_driverImage_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMdd-HHmmss}{extension}";

                string filePath = Path.Combine(uploadPath, fileName); 

                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }
            }

            // Save to DB
            try
            {
                driverObj.Photo = fileName;
                driverObj.CreateDate = DateTime.Now;
                _context.drivers.Add(driverObj);
                await _context.SaveChangesAsync();

                return CreatedAtAction(nameof(GetDrivers), new { id = driverObj.driver_id }, driverObj);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding driver");
                return StatusCode(500, "Internal server error");
            }
        }


        [HttpPut("update-transport-driver/{id}")]
        public async Task<IActionResult> UpdateDriver(int id,[FromQuery] string school_id,[FromForm] string driver,[FromForm] IFormFile? file)
        {
            if (string.IsNullOrWhiteSpace(school_id))
                return BadRequest("School ID is missing.");

            if (string.IsNullOrWhiteSpace(driver))
                return BadRequest("Driver data is missing.");

            Drivers? driverObj;
            try
            {
                driverObj = JsonSerializer.Deserialize<Drivers>(driver);
            }
            catch (JsonException)
            {
                return BadRequest("Invalid driver data format.");
            }

            if (driverObj == null || id != driverObj.driver_id)
                return BadRequest("Driver ID mismatch or invalid driver object.");

            try
            {
                var existingDriver = await _context.drivers.FindAsync(id);
                if (existingDriver == null)
                    return NotFound("Driver not found.");

                // Update fields
                existingDriver.name = driverObj.name;
                existingDriver.dob = driverObj.dob;
                existingDriver.license_no = driverObj.license_no;
                existingDriver.address = driverObj.address;
                existingDriver.joiningDate = driverObj.joiningDate;

                // Handle optional file
                if (file is { Length: > 0 })
                {
                    string uploadsFolder = Path.Combine(_env.WebRootPath, "api", "uploads", school_id, "transport");
                    if (!Directory.Exists(uploadsFolder))
                    {
                        Directory.CreateDirectory(uploadsFolder);
                    }
                    

                    string extension = Path.GetExtension(file.FileName);
                    string baseFileName = Path.GetFileNameWithoutExtension(file.FileName);
                    string fileName = $"{baseFileName}_driverImage_{Guid.NewGuid()}_{DateTime.UtcNow:yyyyMMdd-HHmmss}{extension}";

                    string filePath = Path.Combine(uploadsFolder, fileName);
                    using var stream = new FileStream(filePath, FileMode.Create);
                    await file.CopyToAsync(stream);

                    existingDriver.Photo = fileName;

                    // Optional: Save file path to database if needed
                    // existingDriver.ProfilePhotoPath = Path.Combine("uploads", school_id, "transport", fileName);
                }

                _context.drivers.Update(existingDriver);
                await _context.SaveChangesAsync();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating driver with ID {DriverId}", id);
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }


        [HttpDelete("delete-transport-driver/{id}")]
        public async Task<IActionResult> DeleteDriver(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var driver = await _context.drivers.FindAsync(id);
                if (driver == null)
                {
                    return NotFound("Driver not found.");
                }
                _context.drivers.Remove(driver);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting driver");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

        #region Transport Assignments
        [HttpGet("get-transport-assignments")]
        public async Task<IActionResult> GetTransportAssignments()
        {
            try
            {
                var assignments = await _context.transportAssignments.Include(a => a.vehicle_id).Include(a => a.driver_id).ToListAsync();
                return Ok(assignments);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport assignments");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-assignment")]
        public async Task<IActionResult> AddTransportAssignment([FromBody] TransportAssignments assignment)
        {
            if (assignment == null || assignment.vehicle_id <= 0 || assignment.driver_id <= 0)
            {
                return BadRequest("Invalid transport assignment data.");
            }
            try
            {
                _context.transportAssignments.Add(assignment);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTransportAssignments), new { id = assignment.assignment_id }, assignment);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding transport assignment");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("update-transport-assignment/{id}")]
        public async Task<IActionResult> UpdateTransportAssignment(string school_id, int id, [FromBody] TransportAssignments assignment)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");

            if (assignment == null || id != assignment.assignment_id)
            {
                return BadRequest("Invalid transport assignment data.");
            }
            try
            {
                var existingAssignment = await _context.transportAssignments.FindAsync(id);
                if (existingAssignment == null)
                {
                    return NotFound("Transport assignment not found.");
                }
                existingAssignment.vehicle_id = assignment.vehicle_id;
                existingAssignment.driver_id = assignment.driver_id;
                existingAssignment.route_id = assignment.route_id;
                _context.transportAssignments.Update(existingAssignment);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating transport assignment");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-assignment/{id}")]
        public async Task<IActionResult> DeleteTransportAssignment(string school_id, int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var assignment = await _context.transportAssignments.FindAsync(id);
                if (assignment == null)
                {
                    return NotFound("Transport assignment not found.");
                }
                _context.transportAssignments.Remove(assignment);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting transport assignment");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

        #region Transport Fees
        [HttpGet("get-transport-fees")]
        public async Task<IActionResult> GetTransportFees()
        {
            try
            {
                var fees = await _context.transportFees.Include(f => f.route_id).ToListAsync();
                return Ok(fees);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error fetching transport fees");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPost("add-transport-fee")]
        public async Task<IActionResult> AddTransportFee([FromBody] TransportFees fee)
        {
            if (fee == null || fee.route_id <= 0 || fee.amount <= 0)
            {
                return BadRequest("Invalid transport fee data.");
            }
            try
            {
                _context.transportFees.Add(fee);
                await _context.SaveChangesAsync();
                return CreatedAtAction(nameof(GetTransportFees), new { id = fee.fee_id }, fee);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error adding transport fee");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpPut("update-transport-fee/{id}")]
        public async Task<IActionResult> UpdateTransportFee(string school_id, int id, [FromBody] TransportFees fee)
        {
            if (string.IsNullOrEmpty(school_id))
                return BadRequest("School Id is required Field!");

            if (fee == null || id != fee.fee_id)
            {
                return BadRequest("Invalid transport fee data.");
            }
            try
            {
                var existingFee = await _context.transportFees.FindAsync(id);
                if (existingFee == null)
                {
                    return NotFound("Transport fee not found.");
                }
                existingFee.route_id = fee.route_id;
                existingFee.amount = fee.amount;
                _context.transportFees.Update(existingFee);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error updating transport fee");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        [HttpDelete("delete-transport-fee/{id}")]
        public async Task<IActionResult> DeleteTransportFee(string school_id,int id)
        {
            try
            {
                if (string.IsNullOrEmpty(school_id))
                    return BadRequest("School Id is required Field!");

                var fee = await _context.transportFees.FindAsync(id);
                if (fee == null)
                {
                    return NotFound("Transport fee not found.");
                }
                _context.transportFees.Remove(fee);
                await _context.SaveChangesAsync();
                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error deleting transport fee");
                return StatusCode(StatusCodes.Status500InternalServerError, "Internal server error");
            }
        }

        #endregion

 
    }
}

