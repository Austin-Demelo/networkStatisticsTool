using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace NSC.Service
{
    public class DeviceService
    {
        private DeviceModel _deviceModel;

        public DeviceService()
        {
            _deviceModel = new DeviceModel();
        }

        public int Update(DeviceViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                Device dev = new Device();
                dev.Id = vm.Id;
                dev.DeviceName = vm.DeviceName;
                dev.NetworkId = vm.NetworkId;
                dev.Timer = Convert.FromBase64String(vm.Timer);
                dev.UserId = vm.UserId;
                opStatus = _deviceModel.Update(dev);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;

            }
            return Convert.ToInt16(opStatus);
        }

        public DeviceViewModel Add(DeviceViewModel vm)
        {

            try
            {
                Device dev = new Device();
                dev.DeviceName = vm.DeviceName;
                dev.NetworkId = vm.NetworkId;
                dev.UserId = vm.UserId;
                dev = _deviceModel.Add(dev);
                //Prepare the VM to be sent back to client
                vm.Id = dev.Id;
                return vm;
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
                return _deviceModel.Delete(Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
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
