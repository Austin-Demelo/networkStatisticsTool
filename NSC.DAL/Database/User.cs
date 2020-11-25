namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class User : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public User()
        {
            Devices = new HashSet<Device>();
            NetworkUsers = new HashSet<NetworkUser>();
            NetworkUsers1 = new HashSet<NetworkUser>();
        }


        [Required]
        [StringLength(255)]
        public string UserName { get; set; }

        [Required]
        [StringLength(255)]
        public string UserPass { get; set; }

        public int RoleId { get; set; }

        [StringLength(320)]
        public string UserEmail { get; set; }

        [StringLength(40)]
        public string ActivationKey { get; set; }

        [Column(TypeName = "date")]
        public DateTime? ActivationDate { get; set; }

        [Required]
        [StringLength(40)]
        public string Email { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Device> Devices { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkUser> NetworkUsers { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkUser> NetworkUsers1 { get; set; }

        public virtual UserRole UserRole { get; set; }
    }
}
