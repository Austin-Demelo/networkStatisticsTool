using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
using NSC.DAL.ViewModels;
using SendGrid;
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
        private UserModel _userModel;
        private UserRoleModel _userRoleModel;
        private EmailService _emailService;

        public UserService()
        {
            _userModel = new UserModel();
            _userRoleModel = new UserRoleModel();
            _emailService = new EmailService();
        }
        public int Update(UserViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                User net = new User();
                net.UserName = vm.UserName;
                opStatus = _userModel.Update(net);
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);

            }
            return Convert.ToInt16(opStatus);
        }
        public UserViewModel Add(UserViewModel vm)
        {

            try
            {
                User user = new User();
                user.UserName = vm.UserName;
                user.UserPass = vm.UserPass;
                user.RoleId = _userRoleModel.getDefault().Id;
                user = _userModel.Add(user);
                vm.Id = user.Id;
                return vm;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public User GetByActivationKey(string ActivateKey)
        {
            try
            {
                return _userModel.GetByConfirmationKey(ActivateKey);
                
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public User Login(string Username, string Password)
        {
            try
            {
                List<User> users = _userModel.GetAll();
                users = users.Where<User>(user => user.UserPass == Password && user.UserName == Username && user.ActivationDate != null).ToList();
                return users.FirstOrDefault();

            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }

        public UserViewModel ValidateUser(string ActivateKey)
        {
            UserViewModel userVM = null;
            try
            {
                User user = GetByActivationKey(ActivateKey);
                user.ActivationDate = DateTime.Now;
                _userModel.Update(user);
                userVM = new UserViewModel(user);
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);

            }
            return userVM;
        }



        public int Delete(int Id)
        {
            try
            {
                return _userModel.Delete(Id);
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
                foreach (User network in _userModel.GetAll())
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

        public async Task<UserViewModel> Register(UserViewModel vm)
        {

            try
            {
                User user = new User();
                user.UserName = vm.UserName;
                user.UserPass = vm.UserPass;
                user.Email = vm.Email;
                user.RoleId = _userRoleModel.getDefault().Id;

                string ActivateKey = "";

                while(ActivateKey == "")
                {
                    //Build ActivationKey for User
                    ActivateKey += user.UserName.GetHashCode().ToString("X8");
                    ActivateKey += user.Email.GetHashCode().ToString("X8");
                    ActivateKey += new DateTime().ToString().GetHashCode().ToString("X8");

                    //Make sure ActivationKey is unique
                    if(_userModel.GetByConfirmationKey(ActivateKey) != null)
                    {
                        ActivateKey = "";
                    }
                }

                string ConfirmationBody = $"<a href=\"{NSCResources.ClientURL}/activateAccount/{ActivateKey}\">Click here to Activate your NSC account</a>";


                Task<Task> task = new Task<Task>(async () =>
                {
                    await _emailService.SendEmail(
                    "Activate your NSC Account",
                    ConfirmationBody,
                    user.Email,
                    "chrisaklomp@gmail.com"
                );
                });
                task.Start();
                task.Result.Wait();

                user.ActivationKey = ActivateKey;

                user = _userModel.Add(user);
                vm.Id = user.Id;
                return vm;
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }
    }
}
