using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class NetworkModel
    {
        private INSCRepository<Network> _repo;

        public NetworkModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<Network>(ctx);
        }

        public List<Network> GetAll()
        {
            List<Network> selectedNetworks = null;
            try
            {
                selectedNetworks = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworks;
        }

        public Network GetById(int id)
        {
            List<Network> selectedNetworks = null;
            try
            {
                selectedNetworks = _repo.GetByExpression(network => network.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworks.FirstOrDefault();
        }

        public int Add(Network newNetwork)
        {
            try
            {
                newNetwork = _repo.Add(newNetwork);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newNetwork.Id;
        }

        public UpdateStatus Update(Network updatedNetwork)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedNetwork);
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
            int deletedNetworks = -1;
            try
            {
                deletedNetworks = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedNetworks;
        }
    }
}
