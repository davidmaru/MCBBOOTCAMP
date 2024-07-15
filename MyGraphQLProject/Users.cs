using HotChocolate.AspNetCore;
using Microsoft.Extensions.DependencyInjection;
using MyGraphQLProject;

namespace MyGraphQLProject
{
public class Users
{
    public int id {get; set; }
    public string? name { get; set; }
    public string? address { get; set; }
    public int age { get; set; }
    public string? phone_number { get; set; }
}
}