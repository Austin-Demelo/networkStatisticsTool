using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using NSC.DAL.Database;
using NSC.DAL.Models;

namespace NSC.DAL.ViewModels
{
    public class NetworkProblemViewModel
    {
        public NetworkProblemViewModel() { }
        public NetworkProblemViewModel(NetworkProblem networkproblem)
        {
            DeviceModel dm = new DeviceModel();
            UserModel user = new UserModel();
            if(networkproblem != null)
            {
                Id = networkproblem.Id;
                ProblemType = networkproblem.ProblemType;
                ProblemDescription = networkproblem.ProblemDescription;
                DeviceName = dm.GetById(networkproblem.DeviceId).DeviceName;
                DeviceId = networkproblem.DeviceId;
                UserName = networkproblem.Device.User.UserName;
                Timer = Convert.ToBase64String(networkproblem.Timer);
                TimeProblemOccurred = networkproblem.TimeProblemOccurred.ToString("dddd, dd MMMM yyyy hh:mm tt");
            }
            else
            {
                throw new Exception();
            }
            

        }

        public int Id { get; set; }
        public string ProblemType { get; set; }
        public string ProblemDescription { get; set; }
        public int DeviceId { get; set; }
        public string DeviceName { get; set; }
        public string UserName { get; set; }
        public string Timer { get; set; }
        public string TimeProblemOccurred { get; set; }
    }
}
