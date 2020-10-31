using NSC.DAL.Database;
using NSC.DAL.Repository;
using System;
using System.Collections.Generic;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Reflection;

namespace NSC.DAL.Models
{
    public class SpeedTestServerModel
    {
        private INSCRepository<SpeedTestServer> _repo;

        public SpeedTestServerModel(NSCContext ctx = null)
        {
            _repo = new NSCRepository<SpeedTestServer>(ctx);
        }

        public List<SpeedTestServer> GetAll()
        {
            List<SpeedTestServer> selectedSpeedTestServers = null;
            try
            {
                selectedSpeedTestServers = _repo.GetAll();
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedSpeedTestServers;
        }

        public SpeedTestServer GetById(int id)
        {
            List<SpeedTestServer> selectedSpeedTestServers = null;
            try
            {
                selectedSpeedTestServers = _repo.GetByExpression(speedTestServer => speedTestServer.Id == id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedSpeedTestServers.FirstOrDefault();
        }

        public SpeedTestServer GetByServerId(int serverId)
        {
            List<SpeedTestServer> selectedSpeedTestServers = null;
            try
            {
                selectedSpeedTestServers = _repo.GetByExpression(speedTestServer => speedTestServer.ServerId == serverId);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return selectedSpeedTestServers.FirstOrDefault();
        }

        public int Add(SpeedTestServer newSpeedTestServer)
        {
            try
            {
                newSpeedTestServer = _repo.Add(newSpeedTestServer);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return newSpeedTestServer.Id;
        }

        public UpdateStatus Update(SpeedTestServer updatedSpeedTestServer)
        {
            UpdateStatus opStatus = UpdateStatus.Failed;
            try
            {
                opStatus = _repo.Update(updatedSpeedTestServer);
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
            int deletedSpeedTestServers = -1;
            try
            {
                deletedSpeedTestServers = _repo.Delete(id);
            }
            catch (Exception ex)
            {
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }
            return deletedSpeedTestServers;
        }
    }
}
