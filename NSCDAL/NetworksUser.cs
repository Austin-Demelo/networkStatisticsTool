namespace NSC_DAL
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NetworksUser : NSCEntity
    {

        public int? NetworkId { get; set; }

        public int? UserId { get; set; }

        public virtual Network Network { get; set; }

        public virtual User User { get; set; }
    }
}
