namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class SpeedTestServer : NSCEntity
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public SpeedTestServer()
        {
            NetworkStatTests = new HashSet<NetworkStatTest>();
        }

        public int? ServerId { get; set; }

        [StringLength(255)]
        public string ServerName { get; set; }

        [StringLength(255)]
        public string ServerLocation { get; set; }

        [StringLength(255)]
        public string ServerCountry { get; set; }

        [StringLength(255)]
        public string ServerHost { get; set; }

        [StringLength(255)]
        public string ServerIP { get; set; }

        public int? ServerPort { get; set; }

        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
