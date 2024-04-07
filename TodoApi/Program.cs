using System.Diagnostics;
using Microsoft.EntityFrameworkCore;
using TodoApi;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddDbContext<ToDoDbContext>();
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddScoped<ToDoDbContext>();
builder.Services.AddSwaggerGen();

builder.Services.AddCors(option => option.AddPolicy("AllowAll",
    builder =>
    {
        builder.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader();
    }));



var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

int count = 300;
//GET
app.MapGet("/", async (ToDoDbContext dbContext) =>
{
    var g = await dbContext.Items.ToListAsync();
    return Results.Ok(g);
});
//POST
app.MapPost("/{name}", async (ToDoDbContext dbContext, string name) =>
{
    Item i = new Item();
    i.Id = count++;
    i.Name = name;
    i.IsComplete = false;
    dbContext.Items.Add(i);
    dbContext.SaveChanges();
});

//PUT
app.MapPut("/{id}/{isComplete}", async (ToDoDbContext dbContext, int id,bool isComplete) =>
{
    
    var i = dbContext.Items.SingleOrDefault(item => item.Id == id);
    if (i != null)
    i.IsComplete=isComplete;
    dbContext.SaveChanges();
});

//DELETE
app.MapDelete("/id/{id}", async (ToDoDbContext dbContext, int Id) =>
{
    foreach (var item in dbContext.Items)
    {
        if (item.Id == Id)
        {
            dbContext.Items.Remove(item);
            break;
        }
    }
    dbContext.SaveChanges();
});



app.UseCors("AllowAll");
app.UseSwagger();
app.UseSwaggerUI();

app.Run();




