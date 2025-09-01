using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using SchoolERP.Server.Models;
using SchoolERP.Server.Services;
using System.Text;

var builder = WebApplication.CreateBuilder(args);
 
builder.Services.AddDbContext<SchoolERPContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("SchoolERPConnection"),
        sqlOptions => sqlOptions.EnableRetryOnFailure(
            maxRetryCount: 3,
            maxRetryDelay: TimeSpan.FromSeconds(5),
            errorNumbersToAdd: null)));
 
builder.Services.AddDistributedMemoryCache();
builder.Services.AddSession(options =>
{
    options.IdleTimeout = TimeSpan.FromMinutes(30);
    options.Cookie.HttpOnly = true;
    options.Cookie.IsEssential = true;
});

builder.Services.AddHttpContextAccessor();
 
builder.Services.AddScoped<SessionService>();
builder.Services.AddScoped<Common>();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowSchoolFrontend", builder =>
               //builder.WithOrigins("https://school.akswebsoft.men")
               builder.WithOrigins("https://localhost:4200")
               //builder.WithOrigins("https://127.0.0.1:4200")
               .AllowAnyMethod()
               .AllowAnyHeader()
               .AllowCredentials()  
    );
});
 
var jwtSettings = builder.Configuration.GetSection("JwtSettings");
builder.Services.AddSingleton<JwtService>(provider =>
    new JwtService(
        builder.Configuration["JwtSettings:SecretKey"],
        builder.Configuration["JwtSettings:Issuer"],
        builder.Configuration["JwtSettings:Audience"]
    ));
builder.Services.AddScoped<bussinessLogic>();
builder.Services.AddScoped<UserService>();
builder.Services.AddScoped<EmailService>();
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = true,
            ValidateAudience = true,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            ValidIssuer = jwtSettings["Issuer"],
            ValidAudience = jwtSettings["Audience"],
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtSettings["SecretKey"]))
        };
    });

builder.Services.AddHttpClient();
builder.Services.AddControllers(); 
builder.Services.AddControllers().AddNewtonsoftJson(); 

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
 
app.UseDefaultFiles();
app.UseStaticFiles();
 

app.UseRouting();
app.UseCors("AllowSchoolFrontend");
 
app.UseAuthentication();
 
app.UseAuthorization();

app.UseSession();
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseSwagger();
app.UseSwaggerUI();

//app.UseHttpsRedirection();


app.MapControllers();

app.MapFallbackToFile("/index.html"); 

app.Run();
