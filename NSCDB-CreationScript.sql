--DROP DATABASE SCRIPT
USE master; 
GO
DROP DATABASE IF EXISTS NSCDB; 
GO

--CREATE DATABASE SCRIPT
CREATE DATABASE NSCDB; 
GO
USE NSCDB; 
GO

--DROP TABLES SCRIPT
DROP TABLE IF EXISTS NetworkStatTests; 
GO
DROP TABLE IF EXISTS NetworkInterfaces; 
GO
DROP TABLE IF EXISTS SpeedTestServers; 
GO
DROP TABLE IF EXISTS Devices; 
GO
DROP TABLE IF EXISTS Networks; 
GO
DROP TABLE IF EXISTS NetworkUsers; 
GO
DROP TABLE IF EXISTS Users; 
GO
DROP TABLE IF EXISTS UserRoles; 
GO


CREATE TABLE [dbo].[Devices](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[DeviceName] [varchar](255) NOT NULL,
	[NetworkId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_Device] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NetworkInterfaces]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetworkInterfaces](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[DeviceId] [int] NOT NULL,
	[InternalIP] [varchar](255) NULL,
	[ExternalIP] [varchar](255) NULL,
	[MACAddress] [varchar](255) NULL,
	[InterfaceId] [varchar](255) NULL,
	[InterfaceName] [varchar](255) NULL,
	[InterfaceDescription] [varchar](255) NULL,
	[InterfaceType] [varchar](255) NULL,
	[InterfaceSpeed] [int] NULL,
	[InterfaceStatus] [varchar](255) NULL,
 CONSTRAINT [PK_NetworkInterface] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Networks]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Networks](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[NetworkName] [varchar](255) NOT NULL,
 CONSTRAINT [PK_Network] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NetworkStatTests]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetworkStatTests](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[DeviceId] [int] NOT NULL,
	[TestRunTime] [datetime] NOT NULL,
	[TestStatus] [varchar](255) NOT NULL,
	[Jitter] [decimal](18, 0) NULL,
	[Latency] [decimal](18, 0) NULL,
	[DownloadBandwidth] [int] NULL,
	[DownloadSpeed] [int] NULL,
	[DownloadElapsed] [int] NULL,
	[UploadBandwidth] [int] NULL,
	[UploadSpeed] [int] NULL,
	[UploadElapsed] [int] NULL,
	[PacketLoss] [decimal](18, 0) NULL,
	[ISP] [varchar](255) NULL,
	[NetworkInterfaceId] [int] NULL,
	[SpeedTestServerId] [int] NULL,
	[ActiveVPN] [bit] NULL,
	[ResultId] [varchar](255) NULL,
	[ResultURL] [varchar](255) NULL,
 CONSTRAINT [PK_NetworkStatTest] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[NetworkUsers]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[NetworkUsers](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[NetworkId] [int] NOT NULL,
	[UserId] [int] NOT NULL,
 CONSTRAINT [PK_NetworkUser] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[SpeedTestServers]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[SpeedTestServers](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[ServerId] [int] NULL,
	[ServerName] [varchar](255) NULL,
	[ServerLocation] [varchar](255) NULL,
	[ServerCountry] [varchar](255) NULL,
	[ServerHost] [varchar](255) NULL,
	[ServerIP] [varchar](255) NULL,
	[ServerPort] [int] NULL,
 CONSTRAINT [PK_SpeedTestServer] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[UserRoles]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[UserRoles](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[RoleName] [varchar](255) NOT NULL,
	[RoleDescription] [varchar](255) NULL,
	[IsDefault] [bit] NULL,
 CONSTRAINT [PK_UserRole] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UK_RoleName] UNIQUE NONCLUSTERED 
(
	[RoleName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[Users]    Script Date: 2020-11-18 3:40:18 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[Users](
	[Id] [int] IDENTITY(100,1) NOT NULL,
	[Timer] [timestamp] NOT NULL,
	[UserName] [varchar](255) NOT NULL,
	[UserPass] [varchar](255) NOT NULL,
	[RoleId] [int] NOT NULL,
	[ActivationKey] [nchar](40) NULL,
	[ActivationDate] [date] NULL,
	[Email] [varchar](40) NOT NULL,
 CONSTRAINT [PK_User] PRIMARY KEY CLUSTERED 
(
	[Id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY],
 CONSTRAINT [UK_UserName] UNIQUE NONCLUSTERED 
(
	[UserName] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON) ON [PRIMARY]
) ON [PRIMARY]
GO
ALTER TABLE [dbo].[Devices]  WITH CHECK ADD  CONSTRAINT [FK_DevcieHasUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[Devices] CHECK CONSTRAINT [FK_DevcieHasUser]
GO
ALTER TABLE [dbo].[Devices]  WITH CHECK ADD  CONSTRAINT [FK_DeviceHasNetwork] FOREIGN KEY([NetworkId])
REFERENCES [dbo].[Networks] ([Id])
GO
ALTER TABLE [dbo].[Devices] CHECK CONSTRAINT [FK_DeviceHasNetwork]
GO
ALTER TABLE [dbo].[NetworkInterfaces]  WITH CHECK ADD  CONSTRAINT [FK_NetworkInterfaceHasDevice] FOREIGN KEY([DeviceId])
REFERENCES [dbo].[Devices] ([Id])
GO
ALTER TABLE [dbo].[NetworkInterfaces] CHECK CONSTRAINT [FK_NetworkInterfaceHasDevice]
GO
ALTER TABLE [dbo].[NetworkStatTests]  WITH CHECK ADD  CONSTRAINT [FK_NetworkStatTestHasDevice] FOREIGN KEY([DeviceId])
REFERENCES [dbo].[Devices] ([Id])
GO
ALTER TABLE [dbo].[NetworkStatTests] CHECK CONSTRAINT [FK_NetworkStatTestHasDevice]
GO
ALTER TABLE [dbo].[NetworkStatTests]  WITH CHECK ADD  CONSTRAINT [FK_NetworkStatTestHasNetworkInterface] FOREIGN KEY([NetworkInterfaceId])
REFERENCES [dbo].[NetworkInterfaces] ([Id])
GO
ALTER TABLE [dbo].[NetworkStatTests] CHECK CONSTRAINT [FK_NetworkStatTestHasNetworkInterface]
GO
ALTER TABLE [dbo].[NetworkStatTests]  WITH CHECK ADD  CONSTRAINT [FK_NetworkStatTestHasSpeedTestServer] FOREIGN KEY([SpeedTestServerId])
REFERENCES [dbo].[SpeedTestServers] ([Id])
GO
ALTER TABLE [dbo].[NetworkStatTests] CHECK CONSTRAINT [FK_NetworkStatTestHasSpeedTestServer]
GO
ALTER TABLE [dbo].[NetworkUsers]  WITH CHECK ADD  CONSTRAINT [FK_NetworkUserHasNetwork] FOREIGN KEY([NetworkId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[NetworkUsers] CHECK CONSTRAINT [FK_NetworkUserHasNetwork]
GO
ALTER TABLE [dbo].[NetworkUsers]  WITH CHECK ADD  CONSTRAINT [FK_NetworkUserHasUser] FOREIGN KEY([UserId])
REFERENCES [dbo].[Users] ([Id])
GO
ALTER TABLE [dbo].[NetworkUsers] CHECK CONSTRAINT [FK_NetworkUserHasUser]
GO
ALTER TABLE [dbo].[Users]  WITH CHECK ADD  CONSTRAINT [FK_UserHasUserRole] FOREIGN KEY([RoleId])
REFERENCES [dbo].[UserRoles] ([Id])
GO
ALTER TABLE [dbo].[Users] CHECK CONSTRAINT [FK_UserHasUserRole]
GO

