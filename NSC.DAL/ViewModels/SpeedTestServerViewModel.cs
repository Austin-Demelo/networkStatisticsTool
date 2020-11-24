using NSC.DAL.Database;

namespace NSC.DAL.ViewModels
{
    public class SpeedTestServerViewModel
    {
        public SpeedTestServerViewModel() { }
        public SpeedTestServerViewModel(SpeedTestServer speedTestServer)
        {
            if(speedTestServer != null)
            {

                ServerId = speedTestServer.ServerId;
                ServerName = speedTestServer.ServerName;
                ServerLocation = speedTestServer.ServerLocation;
                ServerCountry = speedTestServer.ServerCountry;
                ServerHost = speedTestServer.ServerHost;
                ServerIP = speedTestServer.ServerIP;
                ServerPort = speedTestServer.ServerPort;
            }
        }

        public int? ServerId { get; set; }
        public string ServerName { get; set; }
        public string ServerLocation { get; set; }
        public string ServerCountry { get; set; }
        public string ServerHost { get; set; }
        public string ServerIP { get; set; }
        public int? ServerPort { get; set; }

    }
}
