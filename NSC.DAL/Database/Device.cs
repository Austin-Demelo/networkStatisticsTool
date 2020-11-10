namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Data class representing an electronic device on a network. Each computer, phone, tablet, etc. on the network.
    /// </summary>
    public partial class Device : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Device()
        {
            NetworkInterfaces = new HashSet<NetworkInterface>();
            NetworkStatTests = new HashSet<NetworkStatTest>();
        }

        /// <summary>
        /// Name/Alias of the Device, chosen by the User. Eg. "Scott-Android"
        /// </summary>
        [Required]
        [StringLength(255)]
        public string DeviceName { get; set; }

        /// <summary>
        /// Id of the Network the Device is attached to, populated from the parent Network.
        /// </summary>
        public int NetworkId { get; set; }

        public int? UserId { get; set; }

        /// <summary>
        /// User object of the User the device is atached to, populated from the current User.
        /// </summary>
        public virtual User User { get; set; }

        /// <summary>
        /// Network object of the Network the Device is attached to, populated from the parent Network.
        /// </summary>
        public virtual Network Network { get; set; }

        /// <summary>
        /// Collection of NetworkInterfaces associated with the Device, populated by the SpeedTester.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkInterface> NetworkInterfaces { get; set; }

        /// <summary>
        /// Collection of NetworkStatTests run by the device, pupulated by the associated NetworkStatTests.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
