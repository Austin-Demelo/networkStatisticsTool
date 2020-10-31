using NSC.DAL.Database;

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
        }

        public int Id { get; set; }
        public string UserName { get; set; }
        public UserRoleViewModel UserRole { get; set; }
    }
}
