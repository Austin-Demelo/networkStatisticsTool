using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

namespace NSC.Service.Services
{
    public class UserService
    {
        private UserModel _networkModel;

        public UserService()
        {
            _networkModel = new UserModel();
        }
        public int Update(UserViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                User net = new User();
                net.UserName = vm.UserName;
                opStatus = _networkModel.Update(net);
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);

            }
            return Convert.ToInt16(opStatus);
        }
        public int Add(UserViewModel vm)
        {

            try
            {
                User net = new User();
                net.UserName = vm.UserName;
                return _networkModel.Add(net);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public int Delete(int Id)
        {
            try
            {
                return _networkModel.Delete(Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }
        public List<UserViewModel> GetAll()
        {
            List<UserViewModel> networkViewModels = new List<UserViewModel>();
            try
            {
                foreach (User network in _networkModel.GetAll())
                {

                    List<DeviceViewModel> deviceViewModels = new List<DeviceViewModel>();
                    foreach (Device device in network.Devices)
                    {
                        deviceViewModels.Add(new DeviceViewModel(device));
                    }
                    networkViewModels.Add(new UserViewModel(network));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return networkViewModels;
        }
    }
}
