using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace NSC_DAL
{
    public class NetworkModel
    {
        IRepository<Network> repo;

        public NetworkModel()
        {
            repo = new NSCRepository<Network>();
        }

        public List<Network> GetAll()
        {
            List<Network> allNetworks = new List<Network>();

            try
            {

                allNetworks = repo.GetAll();
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return allNetworks;
        }
    }
}
