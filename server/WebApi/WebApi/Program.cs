using english_project_server;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Interface;
using Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer; // שורה חדשה
using Microsoft.IdentityModel.Tokens; // שורה חדשה
using System.Text; // שורה חדשה

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Database>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- התחלה: הוספת אימות JWT ---
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration["Jwt:Key"])),
            ValidateIssuer = false,
            ValidateAudience = false
        };
    });
// --- סיום: הוספת אימות JWT ---

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

builder.Services.AddScoped<IContext, Database>();

// Repositories
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<ReadingTextsRepository>();
builder.Services.AddScoped<ReadingQuestionsRepository>();
builder.Services.AddScoped<GrammarQuestionsRepository>();
builder.Services.AddScoped<VocabularyQuestionsRepository>();
builder.Services.AddScoped<LevelTestQuestionsRepository>();
builder.Services.AddScoped<LevelTestResultsRepository>();
builder.Services.AddScoped<PracticeResultsRepository>();
builder.Services.AddScoped<CurrentUserLevelRepository>();
builder.Services.AddScoped<UserRepository>();

// Services
builder.Services.AddScoped<ILevelTestService, LevelTestService>();
builder.Services.AddScoped<ICurrentUserLevelService, CurrentUserLevelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReadingService, ReadingService>();
builder.Services.AddScoped<IGrammarQuestions, GrammarQuestionsService>();
builder.Services.AddScoped<IVocabularyQuestions, VocabularyQuestionsService>();

// רישום שירות הטוקנים החדש שיצרת בשלב הקודם
builder.Services.AddScoped<ITokenService, TokenService>(); // שורה חדשה

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

// --- חשוב מאוד: UseAuthentication חייב לבוא לפני UseAuthorization ---
app.UseAuthentication(); // שורה חדשה
app.UseAuthorization();

app.MapControllers();
app.Run();