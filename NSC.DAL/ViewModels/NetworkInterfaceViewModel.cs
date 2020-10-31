using NSC.DAL.Database;
using System.Collections.Generic;

namespace NSC.DAL.ViewModels
{
    public class NetworkInterfaceViewModel
    {
        public NetworkInterfaceViewModel() { }

        public NetworkInterfaceViewModel(NetworkInterface networkInterface)
        {

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
        public DeviceViewModel Device { get; set; }
        public ICollection<NetworkStatTestViewModel> NetworkStatTests { get; set; }
    }
}
