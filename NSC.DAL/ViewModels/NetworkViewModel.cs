using System.Collections.Generic;

namespace NSC.DAL.ViewModels
{
    public class NetworkViewModel
    {
        public int Id { get; set; }
        public string NetworkName { get; set; }
        public ICollection<DeviceViewModel> Devices { get; set; }
    }
}
