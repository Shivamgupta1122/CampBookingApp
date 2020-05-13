using BussinessLayer;
using BussinessLayer.Contracts;
using Microsoft.Owin.Security.OAuth;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using System.Web;

namespace CampBookingApp.App_Start
{
    public class AuthServiceProvider : OAuthAuthorizationServerProvider

    {

        IAccountService accountService;
        public AuthServiceProvider()
        {
            accountService = (IAccountService)new ServiceFactory().GetAccountService();
        }
       #pragma warning disable CS1998 // Async method lacks 'await' operators and will run synchronously

        public override async Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)

        {
            context.Validated();
        }
        // To generate Token if valid
        public override async Task GrantResourceOwnerCredentials(OAuthGrantResourceOwnerCredentialsContext context)

        {
            var identity = new ClaimsIdentity(context.Options.AuthenticationType);
            if (accountService.IsValid(context.UserName, context.Password))
            {
                identity.AddClaim(new Claim(ClaimTypes.Role, "admin"));
                context.Validated(identity);
            }
            else
            {
                context.SetError("invalid_grant", "Please Provide valid email and password");
            }
        }
    }
}