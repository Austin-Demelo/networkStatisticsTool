INSERT INTO UserRoles (RoleName, RoleDescription, IsDefault)
VALUES ('Admin', 'Network Adminstrator etc...', 1),('Client', 'Device User etc...', 0),('Viewer', 'Anyone Interested etc...', 0);

INSERT INTO Networks (NetworkName)
VALUES ('TestNetwork1'), ('TestNetwork2'), ('TestNetwork3'), ('TestNetwork4');

INSERT INTO Devices (DeviceName, NetworkId, UserId)
VALUES ('TestDevice1', 100, 100), ('TestDevice2', 100, 100), ('TestDevice3', 100, 100);