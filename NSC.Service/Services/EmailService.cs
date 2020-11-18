using NSC.DAL.Database;
using NSC.DAL.ViewModels;
using SendGrid;
using SendGrid.Helpers.Mail;
using System;
using System.Text.RegularExpressions;
using System.Threading.Tasks;

namespace NSC.Service.Services
{
    public class EmailService
    {
        const string SendGridApiKey = "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";
        // In ASP.Net, a controller cannot resolve an async function with return type void
        // TLDR, make sure async functions return something
        public async Task<Response> SendEmail(string subject, string HtmlBody, string toAddress, string fromAddress, string toName = null, string fromName = null)
        {
            var client = new SendGridClient(SendGridApiKey);
            var from = new EmailAddress(fromAddress, fromName);
            var to = new EmailAddress(toAddress, toName);
            var msg = MailHelper.CreateSingleEmail(from, to, subject, Regex.Replace(HtmlBody, "<.*?>", String.Empty), HtmlBody);
            return await client.SendEmailAsync(msg);
        }

        public User SendConfirmationEmail(User user)
        {
            string ConfirmKey = "";

            ConfirmKey += user.UserName.GetHashCode().ToString("X8");
            ConfirmKey += user.Email.GetHashCode().ToString("X8");
            ConfirmKey += new DateTime().ToString().GetHashCode().ToString("X8");

            user.ActivationKey = ConfirmKey;

            return user;
        }
    }
}
