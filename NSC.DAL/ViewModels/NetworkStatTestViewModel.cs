using NSC.DAL.Database;
using System;

namespace NSC.DAL.ViewModels
{
    public class NetworkStatTestViewModel
    {
        public NetworkStatTestViewModel() { }
        public NetworkStatTestViewModel(NetworkStatTest networkStatTest)
        {
            DeviceId = networkStatTest.DeviceId;
            TestRunTime = networkStatTest.TestRunTime;
            TestStatus = networkStatTest.TestStatus;
            Jitter = networkStatTest.Jitter;
            Latency = networkStatTest.Latency;
            DownloadBandwidth = networkStatTest.DownloadBandwidth;
            DownloadSpeed = networkStatTest.DownloadSpeed;
            DownloadElapsed = networkStatTest.DownloadElapsed;
            UploadBandwidth = networkStatTest.UploadBandwidth;
            UploadSpeed = networkStatTest.UploadSpeed;
            UploadElapsed = networkStatTest.UploadElapsed;
            PacketLoss = networkStatTest.PacketLoss;
            ISP = networkStatTest.ISP;
            ActiveURL = networkStatTest.ActiveVPN;
            ResultId = networkStatTest.ResultId;
            ResultURL = networkStatTest.ResultURL;
            Device = new DeviceViewModel(networkStatTest.Device);
            NetworkInterface = new NetworkInterfaceViewModel(networkStatTest.NetworkInterface);
            SpeedTestServer = new SpeedTestServerViewModel(networkStatTest.SpeedTestServer);
        }

        public int DeviceId { get; set; }
        public DateTime TestRunTime { get; set; }
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
        public string ISP { get; set; }
        public bool? ActiveURL { get; set; }
        public string ResultId { get; set; }
        public string ResultURL { get; set; }
        public DeviceViewModel Device { get; set; }
        public NetworkInterfaceViewModel NetworkInterface { get; set; }
        public SpeedTestServer SpeedTestServer { get; set; }
    }
}
