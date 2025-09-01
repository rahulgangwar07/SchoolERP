
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens; 
using SchoolERP.Server.Services;
using SchoolERPSYSTEM.Server.Models;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

// Database context
builder.Services.AddDbContext<SchoolERPContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SchoolERPConnection")));

// Enable session support
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

// Add HttpContextAccessor
builder.Services.AddHttpContextAccessor();

// Register the session service
builder.Services.AddScoped<SessionService>();

// Enable CORS for the frontend (Angular)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowLocalhost", builder =>
        builder.WithOrigins("https://localhost:4200")  // Your frontend URL (Angular app running locally)
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials());  // Allow credentials (cookies)
});

// JWT Authentication configuration
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddSingleton<JwtService>(provider =>
    new JwtService(
        builder.Configuration["JwtSettings:SecretKey"],
        builder.Configuration["JwtSettings:Issuer"],
        builder.Configuration["JwtSettings:Audience"]
    ));
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],  // Read from appsettings.json
            ValidAudience = jwtSettings["Audience"],  // Read from appsettings.json
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))  // Read from appsettings.json
        };
    });

// Add API controllers
builder.Services.AddControllers();

// Add Swagger for API documentation
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Middlewares for serving static files, enabling CORS, and handling sessions
app.UseDefaultFiles();  // Optional: for default files like index.html
app.UseStaticFiles();   // For serving static files (e.g., images, CSS, JS)

// Enable session middleware (IMPORTANT for session data to be available)
app.UseSession();

// Enable CORS middleware for the allowed frontend origins
app.UseCors("AllowLocalhost");

// Enable authentication middleware
app.UseAuthentication();  // This will validate the JWT tokens

// Enable authorization middleware
app.UseAuthorization();

// Enable Swagger in development
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

// Enforce HTTPS redirection
app.UseHttpsRedirection();

// Enable routing
app.UseRouting();

// Map controllers to API endpoints
app.MapControllers();

// For SPA (Angular), handle fallback for client-side routing
app.MapFallbackToFile("/index.html");

app.Run();  // Start the application
