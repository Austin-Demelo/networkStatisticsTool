﻿using NSC.DAL.Database;
using System;

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
            }
            else
            {
                throw new Exception();
            }
        }

        public int Id { get; set; }
        public string DeviceName { get; set; }
        //public UserViewModel User { get; set; }
        //public List<NetworkInterface> NetworkInterfaces { get; set; }
        //public List<NetworkStatTest> NetworkStatTests { get; set; }
    }
}
