using NSC.DAL.Database;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NSC.DAL.ViewModels
{
    public class NetworkGraphViewModel
    {
        private const int BYTES_PER_MEGABIT = 125000;
        private const int MILLISECONDS_PER_SECONDS = 1000;
        public NetworkGraphViewModel(NetworkStatTest nst)
        {
            DeviceId = nst.DeviceId;
            TestRunTime = nst.TestRunTime;
            if (nst.DownloadSpeed != null && nst.DownloadElapsed != null && nst.DownloadElapsed > 0)
            {
                DownloadSpeedInMegaBitsPerSecond =

                        Math.Round((decimal)((int)nst.DownloadSpeed / BYTES_PER_MEGABIT) / ((int)nst.DownloadElapsed / MILLISECONDS_PER_SECONDS), 2);
            }
            if (nst.UploadSpeed != null && nst.UploadElapsed != null && nst.UploadElapsed > 0)
            {
                // convert speed in bytes to megabits
                // divide by time elapsed converted from milliseconds to seconds
                UploadSpeedInMegaBitsPerSecond =  Math.Round((decimal)((int)nst.UploadSpeed / BYTES_PER_MEGABIT) / ((int)nst.UploadElapsed / MILLISECONDS_PER_SECONDS), 2);
            }
        }
               


        public decimal DownloadSpeedInMegaBitsPerSecond { get; set; }
        public decimal UploadSpeedInMegaBitsPerSecond { get; set; }
        public DateTime TestRunTime { get; set; }
        public int DeviceId { get; set; }



    }
}
