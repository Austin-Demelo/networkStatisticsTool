namespace NSC.DAL.ViewModels
{
    public class UserViewModel
    {
        public int Id { get; set; }
        public string UserName { get; set; }
        public UserRoleViewModel UserRole { get; set; }
    }
}
