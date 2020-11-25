namespace NSC.DAL.Database
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public partial class NetworkStatTest : NSCEntity
    {
        

        public int DeviceId { get; set; }

        public DateTime TestRunTime { get; set; }

        [Required]
        [StringLength(255)]
        public string TestStatus { get; set; }

        public decimal? Jitter { get; set; }

        public decimal? Latency { get; set; }

        public int? DownloadBandwidth { get; set; }

        public int? DownloadSpeed { get; set; }

        public int? DownloadElapsed { get; set; }

        public int? UploadBandwidth { get; set; }

        public int? UploadSpeed { get; set; }

        public int? UploadElapsed { get; set; }

        public decimal? PacketLoss { get; set; }

        [StringLength(255)]
        public string ISP { get; set; }

        public int? NetworkInterfaceId { get; set; }

        public int? SpeedTestServerId { get; set; }

        public bool? ActiveVPN { get; set; }

        [StringLength(255)]
        public string ResultId { get; set; }

        [StringLength(255)]
        public string ResultURL { get; set; }

        public virtual Device Device { get; set; }

        public virtual NetworkInterface NetworkInterface { get; set; }

        public virtual SpeedTestServer SpeedTestServer { get; set; }
    }
}
