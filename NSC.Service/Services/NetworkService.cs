using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
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
        public int Update(NetworkViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                Network net = new Network();
                net.NetworkName = vm.NetworkName;
                opStatus = _networkModel.Update(net);
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);

            }
            return Convert.ToInt16(opStatus);
        }
        public int Add(NetworkViewModel vm)
        {

            try
            {
                Network net = new Network();
                net.NetworkName = vm.NetworkName;
                return _networkModel.Add(net);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public int Delete(int Id)
        {
            try
            {
                return _networkModel.Delete(Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
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
                        deviceViewModels.Add(new DeviceViewModel(device));
                    }
                    networkViewModels.Add(new NetworkViewModel(network));
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
