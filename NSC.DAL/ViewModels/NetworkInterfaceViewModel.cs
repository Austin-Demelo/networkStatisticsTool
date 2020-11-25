using NSC.DAL.Database;

namespace NSC.DAL.ViewModels
{
    public class NetworkInterfaceViewModel
    {
        public NetworkInterfaceViewModel() { }

        public NetworkInterfaceViewModel(NetworkInterface networkInterface)
        {
            if (networkInterface != null)
            {
                DeviceId = networkInterface.DeviceId;
                InternalIP = networkInterface.InternalIP;
                MACAddress = networkInterface.MACAddress;
                InterfaceId = networkInterface.InterfaceId;
                InterfaceName = networkInterface.InterfaceName;
                InterfaceDescription = networkInterface.InterfaceDescription;
                InterfaceType = networkInterface.InterfaceType;
                InterfaceSpeed = networkInterface.InterfaceSpeed;
                InterfaceStatus = networkInterface.InterfaceStatus;
            }
        }

        public int DeviceId { get; set; }
        public string InternalIP { get; set; }
        public string MACAddress { get; set; }
        public string InterfaceId { get; set; }
        public string InterfaceName { get; set; }
        public string InterfaceDescription { get; set; }
        public string InterfaceType { get; set; }
        public int? InterfaceSpeed { get; set; }
        public string InterfaceStatus { get; set; }
    }
}
