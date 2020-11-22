export interface INetworkStats {
    Id?: number;
    DeviceId: number;
    TestRunTime: Date;
    TestStatus: string;
    DownloadSpeed: number,
    UploadSpeed: number,
    PacketLoss: number,
    Latency: number,
}