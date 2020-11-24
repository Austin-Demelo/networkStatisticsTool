using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace NSC.DAL.Database
{
    public partial class NetworkProblem : NSCEntity
    {
        public string ProblemType {get; set;}
        public string ProblemDescription { get; set; }
        public int DeviceId { get; set; }
        public DateTime TimeProblemOccurred { get; set; }

    }
}
