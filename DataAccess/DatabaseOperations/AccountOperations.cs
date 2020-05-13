using DataAccess.DataAccessModels;
using DataAccess.DataBaseContext;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DataAccess.DatabaseOperations
{
    public class AccountOperations
    {
        public class UserInfo
        {
            public string UserName { get; set; }
            public string Password { get; set; }
        }
        public int SignUp(UserEntity accountEntity)
        {
            using(CampBookingContext context = new CampBookingContext())
            {
                context.Users.Add(accountEntity);
                context.SaveChanges();
                return accountEntity.Id;
            }
        }
        public bool SignIn(UserEntity accountEntity)
        {
            using(CampBookingContext context = new CampBookingContext())
            {
                if (context.Users.Any(s => s.IsAdmin && s.EmailId.ToLower().Equals(accountEntity.EmailId.ToLower()) && s.Password.Equals(accountEntity.Password)))
                {
                    return true;
                }
                else
                    return false;
            }
        }
        public string[] GetUserRoles(string email)
        {
            List<String> Roles = new List<string>();
            using (var context = new CampBookingContext())
            {
                var result = context.Users.Where(s => s.EmailId == email).Select(s => s.IsAdmin).FirstOrDefault();
                if (result)
                {
                    Roles.Add("Admin");
                }
                else
                {
                    Roles.Add("User");
                }
            }
            return Roles.ToArray();
        }
        public bool IsValid(string username, string password)
        {
            using (var context = new CampBookingContext())
            {
                return context.Users.Any(s => (s.EmailId == username && s.Password == password));
            }
           
        }
        public UserInfo GetUserInfo()
        {
            using (var context = new CampBookingContext())
            {
                var userName = context.Users.Select(s => s.EmailId).FirstOrDefault();
                var password = context.Users.Select(s => s.Password).FirstOrDefault();
                UserInfo userInfo = new UserInfo();
                userInfo.UserName = userName;
                userInfo.Password = password;
                return userInfo;
            }
        }


    }
}
