using NSC.DAL.Database;
using System.Collections.Generic;

namespace NSC.DAL.ViewModels
{
    public class NetworkViewModel
    {
        public NetworkViewModel() { }
        public NetworkViewModel(Network network)
        {
            Id = network.Id;
            NetworkName = network.NetworkName;
            Devices = new List<DeviceViewModel>();

            foreach (Device device in network.Devices)
            {
                Devices.Add(new DeviceViewModel(device));
            }
        }

        public int Id { get; set; }
        public string NetworkName { get; set; }
        public ICollection<DeviceViewModel> Devices { get; set; }
    }
}
