using NSC.DAL.Database;
using NSC.DAL.Models;
using NSC.DAL.Repository;
using NSC.DAL.ViewModels;
using System;
using System.Collections.Generic;
using System.Reflection;

namespace NSC.Service
{
    public class NetworkProblemService
    {
        private NetworkProblemModel _networkProblemModel;
        public NetworkProblemService()
        {
            _networkProblemModel = new NetworkProblemModel();
        }
        public int Update(NetworkProblemViewModel vm)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                NetworkProblem netprob = new NetworkProblem();
                netprob.Id = vm.Id;
                netprob.ProblemType = vm.ProblemType;
                netprob.ProblemDescription = vm.ProblemDescription;
                netprob.Timer = Convert.FromBase64String(vm.Timer);
                opStatus = _networkProblemModel.Update(netprob);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;

            }
            return Convert.ToInt16(opStatus);
        }
        public NetworkProblemViewModel Add(NetworkProblemViewModel vm)
        {
            try
            {
                NetworkProblem netprob = new NetworkProblem();
                netprob.DeviceId = vm.DeviceId;
                netprob.ProblemType = vm.ProblemType;
                netprob.ProblemDescription = vm.ProblemDescription;
                //netprob.TimeProblemOccurred = vm.TimeProblemOccurred;
                netprob = _networkProblemModel.Add(netprob);
                //prepare vm to be sent back to the client?
                //idk if this is necessary for my part
                vm.Id = netprob.Id;
                vm.Timer = Convert.ToBase64String(netprob.Timer);
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
                return _networkProblemModel.Delete(Id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
        }
        public List<NetworkProblemViewModel> GetAll()
        {
            List<NetworkProblemViewModel> networkProblemViewModels = new List<NetworkProblemViewModel>();
            try
            {
                foreach (NetworkProblem networkProblem in _networkProblemModel.GetAll())
                {
                    networkProblemViewModels.Add(new NetworkProblemViewModel(networkProblem));
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return networkProblemViewModels;
        }

    }
}
