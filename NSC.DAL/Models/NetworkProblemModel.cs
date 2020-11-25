using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class NetworkProblemModel
    {
        private INSCRepository<NetworkProblem> _repo;

        public NetworkProblemModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<NetworkProblem>(ctx);
        }

        public List<NetworkProblem> GetAll()
        {
            List<NetworkProblem> selectedNetworkProblems = null;
            try
            {
                selectedNetworkProblems = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkProblems;
        }

        public NetworkProblem GetById(int id)
        {
            List<NetworkProblem> selectedNetworkProblems = null;
            try
            {
                selectedNetworkProblems = _repo.GetByExpression(networkProblem => networkProblem.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkProblems.FirstOrDefault();
        }

        public NetworkProblem Add(NetworkProblem newNetworkProblem)
        {
            try
            {

                newNetworkProblem = _repo.Add(newNetworkProblem);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newNetworkProblem;
        }

        public UpdateStatus Update(NetworkProblem updatedNetworkProblem)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedNetworkProblem);
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
            int deletedNetworkProblems = -1;
            try
            {
                deletedNetworkProblems = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return id;
        }
    }
}
