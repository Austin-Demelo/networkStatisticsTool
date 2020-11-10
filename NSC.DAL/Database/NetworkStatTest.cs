namespace NSC.DAL.Database
{
    using System;
    using System.ComponentModel.DataAnnotations;

    /// <summary>
    /// Data class representing a NetworkStatTest. Each Device will have multiple NetworkStatTests. 
    /// </summary>
    public partial class NetworkStatTest : NSCEntity
    {
        /// <summary>
        /// Id of the Device the NetworkStatTest is attached to, populated from the parent Device.
        /// </summary>
        public int DeviceId { get; set; }

        /// <summary>
        /// The Date and Time the NetworkStatTest was started. Populated by the SpeedTester. Eg. "2020-10-21 22:26:46.000"
        /// </summary>
        public DateTime TestRunTime { get; set; }

        /// <summary>
        /// The execution status of the NetworkStatTest. Populated by the SpeedTester. Eg. "Success"
        /// </summary>
        [Required]
        [StringLength(255)]
        public string TestStatus { get; set; }

        /// <summary>
        /// The variance in time delay between data packets in milliseconds. Populated by the SpeedTester. Eg. "7"
        /// </summary>
        public decimal? Jitter { get; set; }

        /// <summary>
        /// The time it takes for a packet to complete a round trip in milliseconds. Populated by the SpeedTester. Eg. "67"
        /// </summary>
        public decimal? Latency { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? DownloadBandwidth { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? DownloadSpeed { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? DownloadElapsed { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? UploadBandwidth { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? UploadSpeed { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? UploadElapsed { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public decimal? PacketLoss { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [StringLength(255)]
        public string ISP { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? NetworkInterfaceId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public int? SpeedTestServerId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public bool? ActiveVPN { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [StringLength(255)]
        public string ResultId { get; set; }

        /// <summary>
        /// 
        /// </summary>
        [StringLength(255)]
        public string ResultURL { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual Device Device { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual NetworkInterface NetworkInterface { get; set; }

        /// <summary>
        /// 
        /// </summary>
        public virtual SpeedTestServer SpeedTestServer { get; set; }
    }
}
