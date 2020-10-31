using NSC.DAL.Database;

namespace NSC.DAL.ViewModels
{
    public class UserRoleViewModel
    {
        public UserRoleViewModel() { }
        public UserRoleViewModel(UserRole userRole)
        {
            RoleName = userRole.RoleName;
            RoleDescription = userRole.RoleDescription;
        }
        public string RoleName { get; set; }
        public string RoleDescription { get; set; }
    }
}
