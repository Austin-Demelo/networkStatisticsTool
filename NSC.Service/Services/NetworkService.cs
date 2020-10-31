using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace NSC.Service
{
    public class NetworkService
    {
        private NetworkModel _networkModel;

        public NetworkService()
        {
            _networkModel = new NetworkModel();
        }

        public List<NetworkViewModel> GetAll()
        {
            List<NetworkViewModel> networkViewModels = new List<NetworkViewModel>();
            try
            {
                foreach (Network network in _networkModel.GetAll())
                {

                    List<DeviceViewModel> deviceViewModels = new List<DeviceViewModel>();
                    foreach (Device device in network.Devices)
                    {
                        deviceViewModels.Add(new DeviceViewModel()
                        {
                            Id = device.Id,
                            DeviceName = device.DeviceName
                        });
                    }
                    networkViewModels.Add(new NetworkViewModel()
                    {
                        Id = network.Id,
                        NetworkName = network.NetworkName,
                        Devices = deviceViewModels
                    });
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return networkViewModels;
        }
    }
}
