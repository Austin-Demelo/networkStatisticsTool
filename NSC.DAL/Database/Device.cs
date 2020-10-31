namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Device : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Device()
        {
            NetworkInterfaces = new HashSet<NetworkInterface>();
            NetworkStatTests = new HashSet<NetworkStatTest>();
        }

        [Required]
        [StringLength(255)]
        public string DeviceName { get; set; }

        public int NetworkId { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public virtual Network Network { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkInterface> NetworkInterfaces { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
