namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NetworkProblem : NSCEntity
    {
    

        [Required]
        [StringLength(255)]
        public string ProblemType { get; set; }

        [StringLength(255)]
        public string ProblemDescription { get; set; }

        public int DeviceId { get; set; }

        public DateTime TimeProblemOccurred { get; set; }

        public virtual Device Device { get; set; }
    }
}
