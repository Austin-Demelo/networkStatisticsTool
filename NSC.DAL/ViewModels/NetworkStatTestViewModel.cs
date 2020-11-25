using NSC.DAL.Database;
using System;

namespace NSC.DAL.ViewModels
{
    public class NetworkStatTestViewModel
    {
        private const int BYTES_PER_MEGABIT = 125000;
        private const int MILLISECONDS_PER_SECONDS = 1000;

        public NetworkStatTestViewModel() { }
        public NetworkStatTestViewModel(NetworkStatTest networkStatTest)
        {
            if (networkStatTest != null)
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
                ActiveVPN = networkStatTest.ActiveVPN;
                ResultId = networkStatTest.ResultId;
                ResultURL = networkStatTest.ResultURL;
                NetworkInterface = new NetworkInterfaceViewModel(networkStatTest.NetworkInterface);
                SpeedTestServer = new SpeedTestServerViewModel(networkStatTest.SpeedTestServer);
            }

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
        public bool? ActiveVPN { get; set; }
        public string ResultId { get; set; }
        public string ResultURL { get; set; }
        public NetworkInterfaceViewModel NetworkInterface { get; set; }
        public SpeedTestServerViewModel SpeedTestServer { get; set; }

        public decimal DownloadSpeedInMegabitsPerSecond
        {
            get
            {
                if (DownloadSpeed != null && DownloadElapsed != null)
                {
                    // convert speed in bytes to megabits
                    // divide by time elapsed converted from milliseconds to seconds
                    return Math.Round((decimal)((int)DownloadSpeed / BYTES_PER_MEGABIT) / ((int)DownloadElapsed / MILLISECONDS_PER_SECONDS), 2);
                }
                else
                {
                    return 0;
                }
            }

        }


        public decimal UploadSpeedInMegabitsPerSecond
        {
            get
            {
                if (UploadSpeed != null && UploadElapsed != null)
                {
                    // convert speed in bytes to megabits
                    // divide by time elapsed converted from milliseconds to seconds
                    return Math.Round((decimal)((int)UploadSpeed / BYTES_PER_MEGABIT) / ((int)UploadElapsed / MILLISECONDS_PER_SECONDS), 2);
                }
                else
                {
                    return 0;
                }

            }
        }
    }
}