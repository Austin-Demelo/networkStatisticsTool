namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class UserRole : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public UserRole()
        {
            Users = new HashSet<User>();
        }

        [Required]
        [StringLength(255)]
        public string RoleName { get; set; }

        [StringLength(255)]
        public string RoleDescription { get; set; }
        public bool IsDefault { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<User> Users { get; set; }
    }
}
