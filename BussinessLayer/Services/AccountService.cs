using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using BussinessLayer.MannualMap;
using DataAccess.DataAccessModels;
using DataAccess.DatabaseOperations;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static DataAccess.DatabaseOperations.AccountOperations;

namespace BussinessLayer.Services
{
    public class AccountService : IAccountService
    {
        AccountOperations accountOperations = new AccountOperations();
        BussinesstoEntity bussinesstoEntity = new BussinesstoEntity();
        public bool SignIn(UserBussiness accountBussiness)
        {
            UserEntity accountEntity = bussinesstoEntity.AccountBussinessToEntity(accountBussiness);
            return accountOperations.SignIn(accountEntity);
        }

        public void SignUp(UserBussiness accountBussiness)
        {
            UserEntity accountEntity = bussinesstoEntity.AccountBussinessToEntity(accountBussiness);
            accountOperations.SignUp(accountEntity);
            //throw new NotImplementedException();
        }

      
        public string[] GetRolesOfUser(string Email)
        {

            AccountOperations accountOperations = new AccountOperations();
            return accountOperations.GetUserRoles(Email);
        }
        public bool IsValid(string username, string password)
        {
            if (accountOperations.IsValid(username, password))
            {
                return true;
            }
            else return false;

        }
        public UserInfo GetUserInfo()
        {
           
            return accountOperations.GetUserInfo();
        }
    }
}
