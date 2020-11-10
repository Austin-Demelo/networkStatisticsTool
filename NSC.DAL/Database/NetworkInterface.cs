namespace NSC.DAL.Database
{
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Data class representing the network interface hardware on the device. Each device will have multiple network interfaces.
    /// </summary>
    public partial class NetworkInterface : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NetworkInterface()
        {
            NetworkStatTests = new HashSet<NetworkStatTest>();
        }

        /// <summary>
        /// Id of the Device the NetworkInterface is attached to, populated from the parent Device.
        /// </summary>
        public int DeviceId { get; set; }

        /// <summary>
        /// Internal/Local IP address of the NetworkInterface, populated by the SpeedTester. Eg. "192.168.1.213"
        /// </summary>
        [StringLength(255)]
        public string InternalIP { get; set; }

        /// <summary>
        /// Public/External IP address of the NetworkInterface, populated by the SpeedTester. Eg. "156.146.58.202"
        /// </summary>
        [StringLength(255)]
        public string ExternalIP { get; set; }

        /// <summary>
        /// MAC Address of the NetworkInterface, populated by the SpeedTester. Eg. "A0510B209D6F"
        /// </summary>
        [StringLength(255)]
        public string MACAddress { get; set; }

        /// <summary>
        /// Id of the NetworkInterface, populated by the SpeedTester. Eg. "{14C3E365-8373-48E4-9B04-9D77A284E42E}"
        /// </summary>
        [StringLength(255)]
        public string InterfaceId { get; set; }

        /// <summary>
        /// Name/Alias of the NetworkInterface, populated by the SpeedTester. Eg. "vEthernet (ExternalSwitch2)"
        /// </summary>
        [StringLength(255)]
        public string InterfaceName { get; set; }

        /// <summary>
        /// Description of the NetworkInterface, populated by the SpeedTester. Eg. "Hyper-V Virtual Ethernet Adapter #3"
        /// </summary>
        [StringLength(255)]
        public string InterfaceDescription { get; set; }

        /// <summary>
        /// Type of the NetworkInterface, populated by the SpeedTester. Eg. "WiFi", "Ethernet"
        /// </summary>
        [StringLength(255)]
        public string InterfaceType { get; set; }

        /// <summary>
        /// Speed of the NetworkInterface in Bytes Per Second, populated by the SpeedTester. Eg. "360000000"
        /// </summary>
        public int? InterfaceSpeed { get; set; }

        /// <summary>
        /// Operational Status of the NetworkInterface, populated by the SpeedTester. Eg. "Up"
        /// </summary>
        [StringLength(255)]
        public string InterfaceStatus { get; set; }

        /// <summary>
        /// Device object of the Device the NetworkInterface is attached to, populated from the parent Device.
        /// </summary>
        public virtual Device Device { get; set; }

        /// <summary>
        /// Collection of NetworkStatTests associated with the NetworkInterface, populated by the associated NetworkStatTests.
        /// </summary>
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
