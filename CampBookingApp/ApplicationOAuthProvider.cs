using BussinessLayer;
using BussinessLayer.Contracts;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace CampBookingApp
{
    public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
    {
        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
        {
            context.Validated();
        }
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)
        {
            IAccountService accountService = (IAccountService)new ServiceFactory().GetAccountService();
            var isValidUser = accountService.IsValid(context.UserName, context.Password);
            var userinfo = accountService.GetUserInfo();
            if (isValidUser)
            {
                var identity = new ClaimsIdentity(context.Options.AuthenticationType);
                identity.AddClaim(new Claim("username", userinfo.UserName));
                identity.AddClaim(new Claim("password", userinfo.Password));
                context.Validated(identity);
            }
            else
            {
                return;
            }
        }
    }
}