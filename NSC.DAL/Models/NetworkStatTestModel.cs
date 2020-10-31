using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class NetworkStatTestModel
    {
        private INSCRepository<NetworkStatTest> _repo;

        public NetworkStatTestModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<NetworkStatTest>(ctx);
        }

        public List<NetworkStatTest> GetAll()
        {
            List<NetworkStatTest> selectedNetworkStatTests = null;
            try
            {
                selectedNetworkStatTests = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkStatTests;
        }

        public NetworkStatTest GetById(int id)
        {
            List<NetworkStatTest> selectedNetworkStatTests = null;
            try
            {
                selectedNetworkStatTests = _repo.GetByExpression(networkStatTest => networkStatTest.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedNetworkStatTests.FirstOrDefault();
        }

        public int Add(NetworkStatTest newNetworkStatTest)
        {
            try
            {
                newNetworkStatTest = _repo.Add(newNetworkStatTest);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newNetworkStatTest.Id;
        }

        public UpdateStatus Update(NetworkStatTest updatedNetworkStatTest)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedNetworkStatTest);
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
            int deletedNetworkStatTests = -1;
            try
            {
                deletedNetworkStatTests = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedNetworkStatTests;
        }
    }
}
