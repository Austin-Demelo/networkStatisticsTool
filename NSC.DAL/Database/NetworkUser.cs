namespace NSC.DAL.Database
{
    public partial class NetworkUser : NSCEntity
    {
        public int NetworkId { get; set; }

        public int UserId { get; set; }

        public virtual User User { get; set; }

        public virtual User User1 { get; set; }
    }
}
