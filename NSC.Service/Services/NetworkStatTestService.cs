using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace NSC.Service
{
    public class NetworkStatTestService
    {
        private NSCContext _ctx;
        private NetworkStatTestModel _networkStatTestModel;
        private SpeedTestService _speedTestService;

        public NetworkStatTestService()
        {
            _ctx = new NSCContext();
            _networkStatTestModel = new NetworkStatTestModel(_ctx);
        }

        public NetworkStatTestViewModel RunSpeedTest(int clientDeviceId)
        {
            NetworkStatTest networkStatTest;
            NetworkStatTestViewModel networkStatTestViewModel;
            try
            {
                _speedTestService = new SpeedTestService(clientDeviceId, _ctx);
                networkStatTest = _speedTestService.RunNetworkStatTest();

                _networkStatTestModel.Add(networkStatTest);

                networkStatTestViewModel = new NetworkStatTestViewModel(networkStatTest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return networkStatTestViewModel;
        }

        public List<NetworkStatTestViewModel> GetAll()
        {
            List<NetworkStatTestViewModel> networkStatTestModels = new List<NetworkStatTestViewModel>();
            try
            {
                foreach (NetworkStatTest networkstattest in _networkStatTestModel.GetAll())
                {
                    networkStatTestModels.Add(new NetworkStatTestViewModel(networkstattest));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkStatTestModels;
        }

        public List<NetworkGraphViewModel> GetGraphData(int deviceId)
        {
            List<NetworkGraphViewModel> listOfStats = new List<NetworkGraphViewModel>();
            try
            {
                foreach (NetworkStatTest nst in _networkStatTestModel.GetGraphData(deviceId))
                {
                    listOfStats.Add(new NetworkGraphViewModel(nst));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return listOfStats;
        }
    }
}
