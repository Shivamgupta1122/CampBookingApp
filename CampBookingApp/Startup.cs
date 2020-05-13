using System;
using System.Threading.Tasks;
using System.Web.Http;
using CampBookingApp.App_Start;
using Microsoft.Owin;
using Microsoft.Owin.Cors;
using Microsoft.Owin.Security.OAuth;
using Owin;

[assembly: OwinStartup(typeof(CampBookingApp.Startup))]

namespace CampBookingApp
{
    public class Startup

    {
        public void Configuration(IAppBuilder app)
        {
           app.UseCors(CorsOptions.AllowAll);
           
              OAuthAuthorizationServerOptions options = new OAuthAuthorizationServerOptions()
            {
                
                TokenEndpointPath = new PathString("/token"),
                AccessTokenExpireTimeSpan = TimeSpan.FromHours(24),
                Provider = new ApplicationOAuthProvider(),
                AllowInsecureHttp = true,
            };
            app.UseOAuthAuthorizationServer(options);
            app.UseOAuthBearerAuthentication(new OAuthBearerAuthenticationOptions());
            HttpConfiguration config = new HttpConfiguration();
            WebApiConfig.Register(config);
        }
    }
}
