using Newtonsoft.Json;
using System;

namespace NSC.DAL.Database
{
    public class SpeedTestJsonObjects
    {
        [JsonObject("root")]
        public class SpeedTest
        {
            [JsonProperty("timestamp")]
            public DateTime TestRunTime { get; set; }
            [JsonProperty("ping")]
            public SpeedTestPing SpeedTestPing { get; set; }
            [JsonProperty("download")]
            public SpeedTestDownload SpeedTestDownload { get; set; }
            [JsonProperty("upload")]
            public SpeedTestUpload SpeedTestUpload { get; set; }
            [JsonProperty("packetLoss")]
            public decimal PacketLoss { get; set; }
            [JsonProperty("isp")]
            public string ISP { get; set; }
            [JsonProperty("interface")]
            public SpeedTestInterface SpeedTestInterface { get; set; }
            [JsonProperty("server")]
            public SpeedTestServer SpeedTestServer { get; set; }
            [JsonProperty("result")]
            public SpeedTestResult SpeedTestResult { get; set; }
        }

        [JsonObject("ping")]
        public class SpeedTestPing
        {
            [JsonProperty("jitter")]
            public decimal Jitter { get; set; }
            [JsonProperty("latency")]
            public decimal Latency { get; set; }
        }

        [JsonObject("download")]
        public class SpeedTestDownload
        {
            [JsonProperty("bandwidth")]
            public int DownloadBandwidth { get; set; }
            [JsonProperty("bytes")]
            public int DownloadSpeed { get; set; }
            [JsonProperty("elapsed")]
            public int DownloadElapsed { get; set; }
        }

        [JsonObject("upload")]
        public class SpeedTestUpload
        {
            [JsonProperty("bandwidth")]
            public int UploadBandwidth { get; set; }
            [JsonProperty("bytes")]
            public int UploadSpeed { get; set; }
            [JsonProperty("elapsed")]
            public int UploadElapsed { get; set; }
        }

        [JsonObject("interface")]
        public class SpeedTestInterface
        {
            [JsonProperty("internalIp")]
            public string InternalIpAddress { get; set; }
            [JsonProperty("name")]
            public string Name { get; set; }
            [JsonProperty("macAddr")]
            public string MacAddress { get; set; }
            [JsonProperty("isVpn")]
            public bool IsVpn { get; set; }
            [JsonProperty("externalIp")]
            public string ExternIpAddress { get; set; }
        }

        [JsonObject("server")]
        public class SpeedTestServer
        {
            [JsonProperty("id")]
            public int Id { get; set; }
            [JsonProperty("name")]
            public string Name { get; set; }
            [JsonProperty("location")]
            public string Location { get; set; }
            [JsonProperty("country")]
            public string Country { get; set; }
            [JsonProperty("host")]
            public string Host { get; set; }
            [JsonProperty("port")]
            public int Port { get; set; }
            [JsonProperty("ip")]
            public string IpAddress { get; set; }
        }

        [JsonObject("result")]
        public class SpeedTestResult
        {
            [JsonProperty("id")]
            public string Id { get; set; }
            [JsonProperty("url")]
            public string Url { get; set; }
        }
    }
}
