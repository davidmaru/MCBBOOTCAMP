using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Dapper;

namespace MyGraphQLProject
{
    public class MutationType
    {
        public async Task<Users> SaveUsersAsync([Service] ApplicationDbContext context, Users newUsers )
        {
            context.Users.Add(newUsers);
            await context.SaveChangesAsync();
            return newUsers;
        }
        public async Task<Users> UpdateUsersAsync([Service] ApplicationDbContext context, Users updateUsers )
        {
            context.Users.Update(updateUsers);
            await context.SaveChangesAsync();
            return updateUsers;
        }
        public async Task<string> DeleteUsersAsync([Service] ApplicationDbContext context, int id)
        {
            var UsersTodelete = await context.Users.FindAsync(id);
            if(UsersTodelete == null){
                return "INVALID OPERATION";
            }
            context.Users.Remove(UsersTodelete);
            await context.SaveChangesAsync();
            return "DELETE SUCCESFUL!";
        }
    }
}