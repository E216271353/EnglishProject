using english_project_server;
using Microsoft.EntityFrameworkCore;
using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Interface;
using Services.Services;
using System;



var builder = WebApplication.CreateBuilder(args);

builder.Services.AddDbContext<Database>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Add CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll", policy =>
    {
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Register DbContext
builder.Services.AddScoped<IContext, Database>();

// Register repositories
builder.Services.AddScoped<IRepository<User>, UserRepository>();
builder.Services.AddScoped<ReadingTextsRepository>();
builder.Services.AddScoped<ReadingQuestionsRepository>();
builder.Services.AddScoped<GrammarQuestionsRepository>();
builder.Services.AddScoped<VocabularyQuestionsRepository>();
builder.Services.AddScoped<LevelTestQuestionsRepository>();
builder.Services.AddScoped<LevelTestResultsRepository>();
builder.Services.AddScoped<PracticeResultsRepository>();
builder.Services.AddScoped<CurrentUserLevelRepository>();

// Register services
builder.Services.AddScoped<ILevelTestService, LevelTestService>();
builder.Services.AddScoped<ICurrentUserLevel, CurrentUserLevelService>();
builder.Services.AddScoped<IUserService, UserService>();
builder.Services.AddScoped<IReadingService, ReadingService>();
builder.Services.AddScoped<IGrammarQuestions, GrammarQuestionsService>();
builder.Services.AddScoped<IVocabularyQuestions, VocabularyQuestionsService>();

var app = builder.Build();



// Configure the HTTP request pipeline. 
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowAll");

app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
