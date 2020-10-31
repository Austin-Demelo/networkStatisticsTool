using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class NetworkUserModel
    {
        private INSCRepository<NetworkUser> _repo;

        public NetworkUserModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<NetworkUser>(ctx);
        }

        public List<NetworkUser> GetAll()
        {
            List<NetworkUser> selectedNetworkUsers = null;
            try
            {
                selectedNetworkUsers = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkUsers;
        }

        public NetworkUser GetById(int id)
        {
            List<NetworkUser> selectedNetworkUsers = null;
            try
            {
                selectedNetworkUsers = _repo.GetByExpression(networkUser => networkUser.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkUsers.FirstOrDefault();
        }

        public int Add(NetworkUser newNetworkUser)
        {
            try
            {
                newNetworkUser = _repo.Add(newNetworkUser);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newNetworkUser.Id;
        }

        public UpdateStatus Update(NetworkUser updatedNetworkUser)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedNetworkUser);
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
            int deletedNetworkUsers = -1;
            try
            {
                deletedNetworkUsers = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedNetworkUsers;
        }
    }
}
