namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NetworkInterface : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public NetworkInterface()
        {
            NetworkStatTests = new HashSet<NetworkStatTest>();
        }


        public int DeviceId { get; set; }

        [StringLength(255)]
        public string InternalIP { get; set; }

        [StringLength(255)]
        public string ExternalIP { get; set; }

        [StringLength(255)]
        public string MACAddress { get; set; }

        [StringLength(255)]
        public string InterfaceId { get; set; }

        [StringLength(255)]
        public string InterfaceName { get; set; }

        [StringLength(255)]
        public string InterfaceDescription { get; set; }

        [StringLength(255)]
        public string InterfaceType { get; set; }

        public int? InterfaceSpeed { get; set; }

        [StringLength(255)]
        public string InterfaceStatus { get; set; }

        public virtual Device Device { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
