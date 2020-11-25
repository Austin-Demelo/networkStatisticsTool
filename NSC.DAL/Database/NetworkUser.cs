namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NetworkUser : NSCEntity
    {
    

        public int NetworkId { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public virtual User User1 { get; set; }
    }
}
