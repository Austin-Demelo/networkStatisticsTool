namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Network : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Network()
        {
            Devices = new HashSet<Device>();
        }

        [Required]
        [StringLength(255)]
        public string NetworkName { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Device> Devices { get; set; }
    }
}
