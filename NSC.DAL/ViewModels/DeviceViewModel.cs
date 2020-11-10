using NSC.DAL.Database;
using System;
using System.Collections.Generic;

namespace NSC.DAL.ViewModels
{
    public class DeviceViewModel
    {
        public DeviceViewModel() { }

        public DeviceViewModel(Device device)
        {
            if (device != null)
            {
                Id = device.Id;
                DeviceName = device.DeviceName;
                NetworkId = device.NetworkId;
                UserId = device.UserId;
                if(device.User != null)
                {
                    DeviceUser =   new UserViewModel(device.User);
                }
                foreach (NetworkInterface networkInterface in device.NetworkInterfaces)
                {
                    NetworkInterfaces.Add(new NetworkInterfaceViewModel(networkInterface));
                }
                foreach (NetworkStatTest networkStatTest in device.NetworkStatTests)
                {
                    NetworkStatTests.Add(new NetworkStatTestViewModel(networkStatTest));
                }
            }
            else
            {
                throw new Exception();
            }
        }

        public int Id { get; set; }
        public string DeviceName { get; set; }

        public int NetworkId { get; set; }

        public int? UserId { get; set; }
        //public UserViewModel User { get; set; }
        //public List<NetworkInterface> NetworkInterfaces { get; set; }
        //public List<NetworkStatTest> NetworkStatTests { get; set; }
        public UserViewModel DeviceUser { get; set; }
        public ICollection<NetworkInterfaceViewModel> NetworkInterfaces { get; set; }
        public ICollection<NetworkStatTestViewModel> NetworkStatTests { get; set; }

    }
}
