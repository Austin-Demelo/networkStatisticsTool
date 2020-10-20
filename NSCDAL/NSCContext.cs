namespace NSC_DAL
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class NSCContext : DbContext
    {
        public NSCContext()
            : base("name=Context")
        {
        }

        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<Network> Networks { get; set; }
        public virtual DbSet<NetworksUser> NetworksUsers { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Device>()
                .Property(e => e.DeviceName)
                .IsUnicode(false);

            modelBuilder.Entity<Network>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Network>()
                .Property(e => e.NetworkName)
                .IsUnicode(false);

            modelBuilder.Entity<NetworksUser>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<User>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<User>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserPass)
                .IsUnicode(false);
        }
    }
}
