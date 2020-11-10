namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Data class representing a network of connected devices. Each network will have multiple devices.
    /// </summary>
    public partial class Network : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Network()
        {
            Devices = new HashSet<Device>();
        }

        /// <summary>
        /// Name/Alias of the Network, chosen by the User. Eg. "Network-1"
        /// </summary>
        [Required]
        [StringLength(255)]
        public string NetworkName { get; set; }

        /// <summary>
        /// Collection of Devices associated with the Network.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Device> Devices { get; set; }
    }
}
