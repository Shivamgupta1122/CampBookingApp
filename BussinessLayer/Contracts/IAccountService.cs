using BussinessLayer.BussinessModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataAccess.DatabaseOperations.AccountOperations;

namespace BussinessLayer.Contracts
{
    public interface IAccountService
    {
        void SignUp(UserBussiness accountBussiness);
       
        bool SignIn(UserBussiness accountBussiness);
        String[] GetRolesOfUser(string email);
        bool IsValid(string username, string passsword);
        UserInfo GetUserInfo();

    }
}
