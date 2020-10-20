namespace NSC_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class Device : NSCEntity
    {

        [StringLength(255)]
        public string DeviceName { get; set; }

        public int? NetworkId { get; set; }

        public int? UserId { get; set; }

        public virtual Network Network { get; set; }

        public virtual User User { get; set; }
    }
}
