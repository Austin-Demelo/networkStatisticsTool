namespace NSC.DAL.Database
{
    using System;
    using System.Data.Entity;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Linq;

    public partial class NSCContext : DbContext
    {
        public NSCContext()
            : base("name=NSCContext")
        {
        }

        public virtual DbSet<Device> Devices { get; set; }
        public virtual DbSet<NetworkInterface> NetworkInterfaces { get; set; }
        public virtual DbSet<Network> Networks { get; set; }
        public virtual DbSet<NetworkStatTest> NetworkStatTests { get; set; }
        public virtual DbSet<NetworkUser> NetworkUsers { get; set; }
        public virtual DbSet<SpeedTestServer> SpeedTestServers { get; set; }
        public virtual DbSet<UserRole> UserRoles { get; set; }
        public virtual DbSet<User> Users { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Device>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Device>()
                .Property(e => e.DeviceName)
                .IsUnicode(false);

            modelBuilder.Entity<Device>()
                .HasMany(e => e.NetworkInterfaces)
                .WithRequired(e => e.Device)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<Device>()
                .HasMany(e => e.NetworkStatTests)
                .WithRequired(e => e.Device)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InternalIP)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.ExternalIP)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.MACAddress)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InterfaceId)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InterfaceName)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InterfaceDescription)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InterfaceType)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkInterface>()
                .Property(e => e.InterfaceStatus)
                .IsUnicode(false);

            modelBuilder.Entity<Network>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<Network>()
                .Property(e => e.NetworkName)
                .IsUnicode(false);

            modelBuilder.Entity<Network>()
                .HasMany(e => e.Devices)
                .WithRequired(e => e.Network)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.TestStatus)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.Jitter)
                .HasPrecision(18, 0);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.Latency)
                .HasPrecision(18, 0);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.PacketLoss)
                .HasPrecision(18, 0);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.ISP)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.ResultId)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkStatTest>()
                .Property(e => e.ResultURL)
                .IsUnicode(false);

            modelBuilder.Entity<NetworkUser>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.ServerName)
                .IsUnicode(false);

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.ServerLocation)
                .IsUnicode(false);

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.ServerCountry)
                .IsUnicode(false);

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.ServerHost)
                .IsUnicode(false);

            modelBuilder.Entity<SpeedTestServer>()
                .Property(e => e.ServerIP)
                .IsUnicode(false);

            modelBuilder.Entity<UserRole>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<UserRole>()
                .Property(e => e.RoleName)
                .IsUnicode(false);

            modelBuilder.Entity<UserRole>()
                .Property(e => e.RoleDescription)
                .IsUnicode(false);

            modelBuilder.Entity<UserRole>()
                .HasMany(e => e.Users)
                .WithRequired(e => e.UserRole)
                .HasForeignKey(e => e.RoleId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .Property(e => e.Timer)
                .IsFixedLength();

            modelBuilder.Entity<User>()
                .Property(e => e.UserName)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .Property(e => e.UserPass)
                .IsUnicode(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.Devices)
                .WithRequired(e => e.User)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.NetworkUsers)
                .WithRequired(e => e.User)
                .HasForeignKey(e => e.NetworkId)
                .WillCascadeOnDelete(false);

            modelBuilder.Entity<User>()
                .HasMany(e => e.NetworkUsers1)
                .WithRequired(e => e.User1)
                .HasForeignKey(e => e.UserId)
                .WillCascadeOnDelete(false);
        }
    }
}
