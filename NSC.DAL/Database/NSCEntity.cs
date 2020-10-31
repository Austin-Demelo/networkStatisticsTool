using System.ComponentModel.DataAnnotations;

namespace NSC.DAL.Database
{
    public class NSCEntity
    {
        public int Id { get; set; }
        [Timestamp]
        public byte[] Timer { get; set; }
    }
}
