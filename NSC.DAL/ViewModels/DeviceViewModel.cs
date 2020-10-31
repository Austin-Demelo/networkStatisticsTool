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
                DeviceUser = new UserViewModel(device.User);
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
        public UserViewModel DeviceUser { get; set; }
        public ICollection<NetworkInterfaceViewModel> NetworkInterfaces { get; set; }
        public ICollection<NetworkStatTestViewModel> NetworkStatTests { get; set; }

    }
}
