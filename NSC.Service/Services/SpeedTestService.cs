using Newtonsoft.Json;
using NSC.DAL.Database;
using NSC.DAL.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.IO;
using System.Linq;
using System.Reflection;
using System.Web.Hosting;
using SNNI = System.Net.NetworkInformation;

namespace NSC.Service
{
    public class SpeedTestService
    {
        private Device _clientDevice;
        private DeviceModel _deviceModel;
        private NetworkInterfaceModel _networkInterfaceModel;

        public SpeedTestService(int clientDeviceId, NSCContext ctx)
        {
            _deviceModel = new DeviceModel(ctx);
            _clientDevice = _deviceModel.GetById(clientDeviceId);
            _networkInterfaceModel = new NetworkInterfaceModel(ctx);
        }

        public NetworkStatTest RunNetworkStatTest()
        {
            NetworkStatTest networkStatTest = new NetworkStatTest();
            try
            {
                string speedTestJsonData = executeSpeedTestCLI();
                SpeedTestJsonObjects.SpeedTest speedTest = deserializeSpeedTestJsonData(speedTestJsonData);
                List<NetworkInterface> networkInterfaces = scanNetworkInterfaces();
                networkStatTest = mapSpeedTestToNetworkStatTest(speedTest, networkInterfaces);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkStatTest;
        }

        private string executeSpeedTestCLI()
        {
            string speedTestCLIPath = HostingEnvironment.ApplicationPhysicalPath + "bin\\speedtest.exe";
            string speedTestCLIArgs = "-f json-pretty";
            string speedTestJsonData = "";
            try
            {
                using (Process process = new Process())
                {
                    // set path
                    process.StartInfo.FileName = speedTestCLIPath;
                    // set arguments
                    process.StartInfo.Arguments = speedTestCLIArgs;

                    // additional start settings
                    process.StartInfo.UseShellExecute = false;
                    process.StartInfo.RedirectStandardOutput = true;

                    // do not display a window
                    process.StartInfo.WindowStyle = ProcessWindowStyle.Hidden;
                    process.StartInfo.CreateNoWindow = true;

                    // start process
                    process.Start();

                    // output json result
                    speedTestJsonData = process.StandardOutput.ReadToEnd();

                    // safely close process
                    process.WaitForExit();
                    process.Dispose();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return speedTestJsonData;
        }

        private SpeedTestJsonObjects.SpeedTest deserializeSpeedTestJsonData(string speedTestJsonData)
        {
            SpeedTestJsonObjects.SpeedTest speedTest = new SpeedTestJsonObjects.SpeedTest();
            try
            {
                JsonSerializer jsonSerializer = new JsonSerializer();
                StringReader stringReader = new StringReader(speedTestJsonData);
                speedTest = jsonSerializer.Deserialize(stringReader, speedTest.GetType()) as SpeedTestJsonObjects.SpeedTest;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return speedTest;
        }

        private List<NetworkInterface> scanNetworkInterfaces()
        {
            List<NetworkInterface> networkInterfaces = new List<NetworkInterface>();

            try
            {
                foreach (SNNI.NetworkInterface ni in SNNI.NetworkInterface.GetAllNetworkInterfaces())
                {
                    if (ni.NetworkInterfaceType == SNNI.NetworkInterfaceType.Wireless80211 || ni.NetworkInterfaceType == SNNI.NetworkInterfaceType.Ethernet)
                    {
                        NetworkInterface existingNetworkInterface = _networkInterfaceModel.GetByInterfaceId(ni.Id);
                        if (existingNetworkInterface == null)
                        {
                            networkInterfaces.Add(new NetworkInterface()
                            {
                                DeviceId = _clientDevice.Id,
                                InternalIP = ni.GetIPProperties().UnicastAddresses.Where(ua => ua.Address.AddressFamily == System.Net.Sockets.AddressFamily.InterNetwork).FirstOrDefault().Address.ToString(),
                                MACAddress = ni.GetPhysicalAddress().ToString(),
                                InterfaceId = ni.Id,
                                InterfaceName = ni.Name,
                                InterfaceDescription = ni.Description,
                                InterfaceType = ni.NetworkInterfaceType.ToString(),
                                InterfaceSpeed = (int)ni.Speed,
                                InterfaceStatus = ni.OperationalStatus.ToString()
                            });
                        }
                        else
                        {
                            networkInterfaces.Add(existingNetworkInterface);
                        }

                    }
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkInterfaces;
        }

        private NetworkStatTest mapSpeedTestToNetworkStatTest(SpeedTestJsonObjects.SpeedTest speedTest, List<NetworkInterface> networkInterfaces)
        {
            NetworkStatTest networkStatTest = new NetworkStatTest();
            try
            {
                networkStatTest = new NetworkStatTest()
                {
                    DeviceId = _clientDevice.Id,
                    TestRunTime = speedTest.TestRunTime,
                    Jitter = speedTest.SpeedTestPing.Jitter,
                    Latency = speedTest.SpeedTestPing.Latency,
                    DownloadBandwidth = speedTest.SpeedTestDownload.DownloadBandwidth,
                    DownloadSpeed = speedTest.SpeedTestDownload.DownloadSpeed,
                    DownloadElapsed = speedTest.SpeedTestDownload.DownloadElapsed,
                    UploadBandwidth = speedTest.SpeedTestUpload.UploadBandwidth,
                    UploadSpeed = speedTest.SpeedTestUpload.UploadSpeed,
                    UploadElapsed = speedTest.SpeedTestUpload.UploadElapsed,
                    PacketLoss = speedTest.PacketLoss,
                    ISP = speedTest.ISP,
                    ActiveVPN = speedTest.SpeedTestInterface.IsVpn,
                    ResultId = speedTest.SpeedTestResult.Id,
                    ResultURL = speedTest.SpeedTestResult.Url,
                    NetworkInterface = networkInterfaces.Where(ni => ni.InternalIP == speedTest.SpeedTestInterface.InternalIpAddress).FirstOrDefault(),
                    SpeedTestServer = new SpeedTestServer()
                    {
                        ServerId = speedTest.SpeedTestServer.Id,
                        ServerName = speedTest.SpeedTestServer.Name,
                        ServerLocation = speedTest.SpeedTestServer.Location,
                        ServerCountry = speedTest.SpeedTestServer.Country,
                        ServerHost = speedTest.SpeedTestServer.Host,
                        ServerIP = speedTest.SpeedTestServer.IpAddress,
                        ServerPort = speedTest.SpeedTestServer.Port
                    }
                };
                networkStatTest.NetworkInterface.ExternalIP = speedTest.SpeedTestInterface.ExternIpAddress;
                if (networkStatTest.DownloadSpeed != null && networkStatTest.DownloadSpeed > 0 && networkStatTest.UploadSpeed != null && networkStatTest.UploadSpeed > 0)
                {
                    networkStatTest.TestStatus = "Success";
                }
                else
                {
                    networkStatTest.TestStatus = "Failed";
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkStatTest;
        }
    }
}
