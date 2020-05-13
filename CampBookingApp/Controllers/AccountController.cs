using BussinessLayer;
using BussinessLayer.BussinessModels;
using BussinessLayer.Contracts;
using CampBookingApp.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace CampBookingApp.Controllers
{
       [RoutePrefix("Api/Login")]
        public class AccountController : ApiController
        {
            IAccountService accountService;
            public AccountController()
            {
                accountService = (IAccountService)new ServiceFactory().GetAccountService();
            }
            [HttpPost]
            [Route("AccountLogin")]

            public IHttpActionResult PostLogin(User account)

            {
                UserBussiness accountModel = new UserBussiness()
                {
                    EmailId = account.EmailId,
                    Password = account.Password,
                };
                try
                {
                    if (!accountService.SignIn(accountModel))
                    {
                        return NotFound();
                    }
                }
                catch (Exception)
                {
                    throw;
                }
                return Ok(account);
            }
        }
    }

