using Repository.Entities;
using Repository.Interfaces;
using Repository.Repositories;
using Services.Interface;
using Services.Services;
using english_project_server;

var builder = WebApplication.CreateBuilder(args);

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
builder.Services.AddScoped<ILevelTestService, LevelTestService>();


// Register services
builder.Services.AddScoped<IUserService, UserService>();

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
