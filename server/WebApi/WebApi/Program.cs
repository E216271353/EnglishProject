using english_project_server;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Interface;
using Services.Services;
using Microsoft.AspNetCore.Authentication.JwtBearer; // ���� ����
using Microsoft.IdentityModel.Tokens; // ���� ����
using System.Text; // ���� ����

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Database>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// --- �����: ����� ����� JWT ---
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
// --- ����: ����� ����� JWT ---

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

// Register repositories
builder.Services.AddScoped<UserRepository>();
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

// ����� ����� ������� ���� ����� ���� �����
builder.Services.AddScoped<ITokenService, TokenService>(); // ���� ����

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");
app.UseHttpsRedirection();

// --- ���� ����: UseAuthentication ���� ���� ���� UseAuthorization ---
app.UseAuthentication(); // ���� ����
app.UseAuthorization();

app.MapControllers();
app.Run();