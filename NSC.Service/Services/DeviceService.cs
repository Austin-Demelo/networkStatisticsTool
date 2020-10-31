using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace NSC.Service.Services
{
    public class DeviceService
    {
        private DeviceModel _deviceModel;

        public DeviceService()
        {
            _deviceModel = new DeviceModel();
        }

        public List<DeviceViewModel> GetAll()
        {
            List<DeviceViewModel> deviceViewModels = new List<DeviceViewModel>();
            try
            {
                foreach (Device device in _deviceModel.GetAll())
                {
                    deviceViewModels.Add(new DeviceViewModel(device));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return deviceViewModels;
        }
    }
}
