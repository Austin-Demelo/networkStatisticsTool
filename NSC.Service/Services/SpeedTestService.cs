using Newtonsoft.Json;
using NSC.DAL.Database;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Reflection;
using SNNI = System.Net.NetworkInformation;

namespace NSC.Service
{
    public class SpeedTestService
    {
        private const string OOKLA_SPEEDTEST_DEFAULT_PATH = @"speedtest.exe";
        private const string OOKLA_SPEEDTEST_DEFAULT_ARGS = "-f json-pretty";
        private Device _clientDevice;

        public SpeedTestService(Device clientDevice)
        {
            _clientDevice = clientDevice;
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
            }
            return networkStatTest;
        }

        private string executeSpeedTestCLI(string path = OOKLA_SPEEDTEST_DEFAULT_PATH, string args = OOKLA_SPEEDTEST_DEFAULT_ARGS)
        {
            string speedTestJsonData = "";
            try
            {
                using (System.Diagnostics.Process pProcess = new System.Diagnostics.Process())
                {
                    pProcess.StartInfo.FileName = path;
                    pProcess.StartInfo.Arguments = args; // argument

                    pProcess.StartInfo.UseShellExecute = false;
                    pProcess.StartInfo.RedirectStandardOutput = true;
                    pProcess.StartInfo.WindowStyle = System.Diagnostics.ProcessWindowStyle.Hidden;
                    pProcess.StartInfo.CreateNoWindow = true; // do not display a window

                    pProcess.Start();
                    speedTestJsonData = pProcess.StandardOutput.ReadToEnd(); // output json result

                    pProcess.WaitForExit();
                    pProcess.Dispose();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
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
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
            }
            return networkInterfaces;
        }

        private NetworkStatTest mapSpeedTestToNetworkStatTest(SpeedTestJsonObjects.SpeedTest speedTest, List<NetworkInterface> networkInterfaces)
        {
            NetworkStatTest networkStatTest = new NetworkStatTest();
            try
            {
                // SPECIFY UNIT SIZES          
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
            }
            return networkStatTest;
        }

        private double CovertBytesToMegabits(int bytes)
        {
            double bytesPerMegabit = 1048576;
            double megabits = Math.Round(bytes / bytesPerMegabit, 2);
            return megabits;
        }

        private double ConvertBytesToMegabytes(int bytes)
        {
            double bytesPerMegabyte = 131072;
            double megabytes = Math.Round(bytes / bytesPerMegabyte, 2);
            return megabytes;
        }
    }
}
