using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class NetworkInterfaceModel
    {
        private INSCRepository<NetworkInterface> _repo;

        public NetworkInterfaceModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<NetworkInterface>(ctx);
        }

        public List<NetworkInterface> GetAll()
        {
            List<NetworkInterface> selectedNetworkInterfaces = null;
            try
            {
                selectedNetworkInterfaces = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkInterfaces;
        }

        public NetworkInterface GetById(int id)
        {
            List<NetworkInterface> selectedNetworkInterfaces = null;
            try
            {
                selectedNetworkInterfaces = _repo.GetByExpression(networkInterface => networkInterface.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkInterfaces.FirstOrDefault();
        }

        public NetworkInterface GetByInterfaceId(string interfaceId)
        {
            List<NetworkInterface> selectedNetworkInterfaces = null;
            try
            {
                selectedNetworkInterfaces = _repo.GetByExpression(networkInterface => networkInterface.InterfaceId == interfaceId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkInterfaces.FirstOrDefault();
        }

        public int Add(NetworkInterface newNetworkInterface)
        {
            try
            {
                newNetworkInterface = _repo.Add(newNetworkInterface);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newNetworkInterface.Id;
        }

        public UpdateStatus Update(NetworkInterface updatedNetworkInterface)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedNetworkInterface);
            }
            catch (DbUpdateConcurrencyException dbuex)
            {
                opStatus = UpdateStatus.Stale;
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + dbuex.Message);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return opStatus;
        }

        public int Delete(int id)
        {
            int deletedNetworkInterfaces = -1;
            try
            {
                deletedNetworkInterfaces = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedNetworkInterfaces;
        }
    }
}
