using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.Service;

namespace NSC.Console
{
    class Program
    {
        static void Main(string[] args)
        {
            NSCContext ctx = new NSCContext();
            DeviceModel deviceModel = new DeviceModel(ctx);
            NetworkInterfaceModel networkInterfaceModel = new NetworkInterfaceModel(ctx);
            NetworkStatTestModel networkStatTestModel = new NetworkStatTestModel(ctx);
            SpeedTestServerModel speedTestServerModel = new SpeedTestServerModel(ctx);
            SpeedTestService speedTestService = new SpeedTestService(deviceModel.GetById(100));
            NetworkStatTest networkStatTest = speedTestService.RunNetworkStatTest();

            NetworkInterface existingNetworkInterface = networkInterfaceModel.GetByInterfaceId(networkStatTest.NetworkInterface.InterfaceId);
            if (existingNetworkInterface != null)
            {
                networkStatTest.NetworkInterface = existingNetworkInterface;
            }

            SpeedTestServer existingSpeedTestServer = speedTestServerModel.GetByServerId(networkStatTest.SpeedTestServer.ServerId ?? 0);
            if (existingSpeedTestServer != null)
            {
                networkStatTest.SpeedTestServer = existingSpeedTestServer;
            }

            networkStatTestModel.Add(networkStatTest);
        }
    }
}
