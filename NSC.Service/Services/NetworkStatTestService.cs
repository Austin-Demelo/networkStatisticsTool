using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace NSC.Service
{
    public class NetworkStatTestService
    {
        private NetworkStatTestModel _networkStatTestModel;
        private NetworkInterfaceModel _networkInterfaceModel;
        private SpeedTestServerModel _speedTestServerModel;

        public NetworkStatTestService()
        {
            _networkStatTestModel = new NetworkStatTestModel();
            _networkInterfaceModel = new NetworkInterfaceModel();
            _speedTestServerModel = new SpeedTestServerModel();
        }
        public int Update(NetworkStatTestViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                NetworkStatTest netstat = new NetworkStatTest();
                netstat.DeviceId = vm.DeviceId;
                netstat.TestRunTime = vm.TestRunTime;
                netstat.TestStatus = vm.TestStatus;
                netstat.Jitter = vm.Jitter;
                netstat.Latency = vm.Latency;
                netstat.DownloadBandwidth = vm.DownloadBandwidth;
                netstat.DownloadSpeed = vm.DownloadSpeed;
                netstat.DownloadElapsed = vm.DownloadElapsed;
                netstat.UploadBandwidth = vm.UploadBandwidth;
                netstat.UploadSpeed = vm.UploadSpeed;
                netstat.UploadElapsed = vm.UploadElapsed;
                netstat.PacketLoss = vm.PacketLoss;
                netstat.ISP = vm.ISP;
                netstat.NetworkInterface = _networkInterfaceModel.GetByInterfaceId(vm.NetworkInterface.InterfaceId);
                netstat.SpeedTestServer = _speedTestServerModel.GetByServerId(vm.SpeedTestServer.ServerId ?? 0);
                netstat.ActiveVPN = vm.ActiveVPN;
                netstat.ResultId = vm.ResultId;
                netstat.ResultURL = vm.ResultURL;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);

            }
            return Convert.ToInt16(opStatus);
        }

        public List<NetworkStatTestViewModel> GetAll()
        {
            List<NetworkStatTestViewModel> networkStatTestModels = new List<NetworkStatTestViewModel>();
            try
            {
                foreach(NetworkStatTest networkstattest in _networkStatTestModel.GetAll())
                {
                    networkStatTestModels.Add(new NetworkStatTestViewModel(networkstattest));
                }
            }catch(Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkStatTestModels;
        }
        public NetworkStatTestViewModel GetById(int id)
        {
            NetworkStatTestViewModel networkStatTestModel = new NetworkStatTestViewModel();
            foreach(NetworkStatTest networkstattest in _networkStatTestModel.GetAll())
            {
                if(networkstattest.DeviceId == id)
                {
                    networkStatTestModel.DeviceId = networkstattest.DeviceId;
                    networkStatTestModel.TestRunTime = networkstattest.TestRunTime;
                    networkStatTestModel.TestStatus = networkstattest.TestStatus;
                    networkStatTestModel.Jitter = networkstattest.Jitter;
                    networkStatTestModel.Latency = networkstattest.Latency;
                    networkStatTestModel.DownloadBandwidth = networkstattest.DownloadBandwidth;
                    networkStatTestModel.DownloadSpeed = networkstattest.DownloadSpeed;
                    networkStatTestModel.DownloadElapsed = networkstattest.DownloadElapsed;
                    networkStatTestModel.UploadBandwidth = networkstattest.UploadBandwidth;
                    networkStatTestModel.UploadSpeed = networkstattest.UploadSpeed;
                    networkStatTestModel.UploadElapsed = networkstattest.UploadElapsed;
                    networkStatTestModel.PacketLoss = networkstattest.PacketLoss;
                    networkStatTestModel.ISP = networkstattest.ISP;
                    //networkStatTestModel.NetworkInterface = _speedTestServerModel.GetByServerId(networkstattest.SpeedTestServer.ServerId ?? 0);
                    //networkStatTestModel.SpeedTestServer = _speedTestServerModel.GetByServerId(networkstattest.SpeedTestServer.ServerId ?? 0);
                    networkStatTestModel.ActiveVPN = networkstattest.ActiveVPN;
                    networkStatTestModel.ResultId = networkstattest.ResultId;
                    networkStatTestModel.ResultURL = networkstattest.ResultURL;
                }
            }
            return networkStatTestModel;
        }

        public List<NetworkGraphViewModel> GetGraphData(int deviceId)
        {
            List<NetworkGraphViewModel> listOfStats = new List<NetworkGraphViewModel>();

            foreach(NetworkStatTest nst in _networkStatTestModel.GetGraphData(deviceId))
            {
                listOfStats.Add(new NetworkGraphViewModel(nst));
            }
            return listOfStats;
        }

    }
}
