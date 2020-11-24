using NSC.DAL.Database;
using System;

namespace NSC.DAL.ViewModels
{
    public class UserViewModel
    {
        public UserViewModel() { }
        public UserViewModel(User user)
        {
            Id = user.Id;
            UserName = user.UserName;
            UserRole = new UserRoleViewModel(user.UserRole);
            Email = user.Email;
            ActivationDate = user.ActivationDate;
            
        }

        public int Id { get; set; }
        public string UserName { get; set; }

        public string UserPass { get; set; }
        public UserRoleViewModel UserRole { get; set; }
        public string Email { get; set; }

        public DateTime? ActivationDate { get; set; }
    }
}
