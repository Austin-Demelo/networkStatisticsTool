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

--CREATE TABLES SCRIPT
CREATE TABLE UserRoles (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	RoleName			VARCHAR(255) NOT NULL,
	RoleDescription		VARCHAR(255),
	IsDefault			BIT,
	CONSTRAINT PK_UserRole PRIMARY KEY(Id),
	CONSTRAINT UK_RoleName UNIQUE(RoleName)
);

CREATE TABLE Users (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	UserName			VARCHAR(255) NOT NULL,
	UserPass			VARCHAR(255) NOT NULL,
	RoleId				INT NOT NULL,
	CONSTRAINT PK_User PRIMARY KEY(Id),
	CONSTRAINT UK_UserName UNIQUE(UserName),
	CONSTRAINT FK_UserHasUserRole FOREIGN KEY(RoleId) REFERENCES UserRoles(Id)
);

CREATE TABLE Networks (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	NetworkName			VARCHAR(255) NOT NULL,
	CONSTRAINT PK_Network PRIMARY KEY(Id)
);

CREATE TABLE NetworkUsers (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	NetworkId			INT NOT NULL,
	UserId				INT NOT NULL,
	CONSTRAINT PK_NetworkUser PRIMARY KEY(Id),
	CONSTRAINT FK_NetworkUserHasNetwork FOREIGN KEY(NetworkId) REFERENCES Users(Id),
	CONSTRAINT FK_NetworkUserHasUser FOREIGN KEY(UserId) REFERENCES Users(Id)
);

CREATE TABLE Devices (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,	
	DeviceName			VARCHAR(255) NOT NULL,
	NetworkId			INT NOT NULL,
	UserId				INT NOT NULL,
	CONSTRAINT PK_Device PRIMARY KEY(Id),
	CONSTRAINT FK_DeviceHasNetwork FOREIGN KEY(NetworkId) REFERENCES Networks(Id),
	CONSTRAINT FK_DevcieHasUser FOREIGN KEY(UserId) REFERENCES Users(Id)
);

CREATE TABLE NetworkInterfaces (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	DeviceId			INT NOT NULL,
	InternalIP			VARCHAR(255),
	ExternalIP			VARCHAR(255),
	MACAddress			VARCHAR(255),
	InterfaceId			VARCHAR(255),
	InterfaceName		VARCHAR(255),
	InterfaceDescription VARCHAR(255),
	InterfaceType		VARCHAR(255),
	InterfaceSpeed		INT,
	InterfaceStatus		VARCHAR(255),
	CONSTRAINT PK_NetworkInterface PRIMARY KEY(Id),
	CONSTRAINT FK_NetworkInterfaceHasDevice FOREIGN KEY(DeviceId) REFERENCES Devices(Id)
);

CREATE TABLE SpeedTestServers (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	ServerId			INT,
	ServerName			VARCHAR(255),
	ServerLocation		VARCHAR(255),
	ServerCountry		VARCHAR(255),
	ServerHost			VARCHAR(255),
	ServerIP			VARCHAR(255),
	ServerPort			INT,
	CONSTRAINT PK_SpeedTestServer PRIMARY KEY(Id)
);

CREATE TABLE NetworkStatTests (
	Id					INT IDENTITY(100,1) NOT NULL,
	Timer				ROWVERSION NOT NULL,
	DeviceId			INT NOT NULL,
	TestRunTime			DATETIME NOT NULL,
	TestStatus			VARCHAR(255) NOT NULL,
	Jitter				DECIMAL,
	Latency				DECIMAL,
	DownloadBandwidth	INT,
	DownloadSpeed		INT,
	DownloadElapsed		INT,
	UploadBandwidth		INT,
	UploadSpeed			INT,
	UploadElapsed		INT,
	PacketLoss			DECIMAL,
	ISP					VARCHAR(255),
	NetworkInterfaceId	INT,
	SpeedTestServerId	INT,
	ActiveVPN			BIT,
	ResultId			VARCHAR(255),
	ResultURL			VARCHAR(255),
	CONSTRAINT PK_NetworkStatTest PRIMARY KEY(Id),
	CONSTRAINT FK_NetworkStatTestHasDevice FOREIGN KEY(DeviceId) REFERENCES Devices(Id),
	CONSTRAINT FK_NetworkStatTestHasNetworkInterface FOREIGN KEY(NetworkInterfaceId) REFERENCES NetworkInterfaces(Id),
	CONSTRAINT FK_NetworkStatTestHasSpeedTestServer FOREIGN KEY(SpeedTestServerId) REFERENCES SpeedTestServers(Id)
);