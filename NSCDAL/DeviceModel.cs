using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Reflection;

namespace NSC_DAL
{
    class DeviceModel
    {
        IRepository<Device> repo;

        public DeviceModel()
        {
            repo = new NSCRepository<Device>();
        }

        public List<Device> GetAll()
        {
            List<Device> allDevices = new List<Device>();

            try
            {

                allDevices = repo.GetAll();
            }
            catch (Exception ex)
            {
                //Compiler figures out the method name using the System.Reflection library
                Console.WriteLine("Problem in " + GetType().Name + " " + MethodBase.GetCurrentMethod().Name + " " + ex.Message);
                throw ex;
            }

            return allDevices;
        }
    }
}
