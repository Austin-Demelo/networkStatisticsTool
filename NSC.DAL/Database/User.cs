namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class User : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            Devices = new HashSet<Device>();
            NetworkUsers = new HashSet<NetworkUser>();
            NetworkUsers1 = new HashSet<NetworkUser>();
        }
        public User(ViewModels.UserViewModel userVM)
        {
            Id = userVM.Id;
            UserName = userVM.UserName;
            UserPass = userVM.UserPass;
            Email = userVM.Email;
            ActivationDate = userVM.ActivationDate;
        }

        [Required]
        [StringLength(255)]
        public string UserName { get; set; }

        [Required]
        [StringLength(255)]
        public string UserPass { get; set; }

        public int RoleId { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Device> Devices { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkUser> NetworkUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkUser> NetworkUsers1 { get; set; }

        public virtual UserRole UserRole { get; set; }

        [StringLength(40)]
        [System.ComponentModel.DefaultValue("")]
        public string ActivationKey { get; set; }

        [DataType(DataType.Date)]
        public DateTime? ActivationDate { get; set; }

        [StringLength(40)]
        public string Email { get; set; }
    }
}
