using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;
using NSC_DAL;

namespace NSCViewModels
{
    public class NetworkViewModel
    {
        private NetworkModel _model;
        public string NetworkName { get; set; }

        public virtual ICollection<Device> Devices { get; set; }

        public virtual ICollection<NetworksUser> NetworksUsers { get; set; }
        public int Id { get; set; }

        public string Timer { get; set; }

        public NetworkViewModel()
        {
            _model = new NetworkModel();
        }

        public List<NetworkViewModel> GetAll()
        {
            List<NetworkViewModel> allVms = new List<NetworkViewModel>();
            try
            {
                List<Network> allNetworks = _model.GetAll();
                foreach (Network network in allNetworks)
                {
                    NetworkViewModel netVM = new NetworkViewModel();

                    netVM.NetworkName = network.NetworkName;
                    netVM.Devices = network.Devices;
                    netVM.NetworksUsers = network.NetworksUsers;
                    netVM.Id = network.Id;
                    netVM.Timer = Convert.ToBase64String(network.Timer);
                    allVms.Add(netVM);
                }
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return allVms;

        }
    }
}
