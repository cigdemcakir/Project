namespace Application.Common.Helpers;

public static class MessagesHelper
{
    public static class Email
    {
        public static class Confirmation
        {
            public static string Subject => "Thank you for signing up to D1 Tech!";
            public static string ActivationMessage => "Thank you for signing up to D1 Tech! In order to activate your account please click the activation button given below.";
            
            public static string Name(string firstName) =>
                $"Hi {firstName}";
            
            public static string ButtonText => "Activate My Account";

            /*public static string Buttonlink(string email, string emailToken) =>
                $"https://project.app/account/account-activation?email={email}&token={emailToken}";*/
            
                
        }
    }
}