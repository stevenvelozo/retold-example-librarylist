-- Data Model -- Generated 2015-12-13T06:07:15.173Z

-- This script creates the following tables:
-- Table ----------------------------------------- Column Count ----------------
--   User                                                   19
--   Role                                                   11
--   Customer                                               12



--   [ User ]
CREATE TABLE IF NOT EXISTS
    User
    (
        IDUser INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDUser CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        CreateDate DATETIME,
        CreatingIDUser INT NOT NULL DEFAULT '0',
        UpdateDate DATETIME,
        UpdatingIDUser INT NOT NULL DEFAULT '0',
        Deleted TINYINT NOT NULL DEFAULT '0',
        DeleteDate DATETIME,
        DeletingIDUser INT NOT NULL DEFAULT '0',
        NameFirst CHAR(48) NOT NULL DEFAULT '',
        NameLast CHAR(48) NOT NULL DEFAULT '',
        Title CHAR(32) NOT NULL DEFAULT '',
        Email CHAR(128) NOT NULL DEFAULT '',
        LoginID CHAR(96) NOT NULL DEFAULT '',
        LoginPassword CHAR(148) NOT NULL DEFAULT '',
        PasswordResetKey CHAR(32) NOT NULL DEFAULT '',
        IDRole INT NOT NULL DEFAULT '0',
        Contractor TINYINT NOT NULL DEFAULT '0',
        IDCustomer INT NOT NULL DEFAULT '0',

        PRIMARY KEY (IDUser)
    );



--   [ Role ]
CREATE TABLE IF NOT EXISTS
    Role
    (
        IDRole INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDRole CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        CreateDate DATETIME,
        CreatingIDUser INT NOT NULL DEFAULT '0',
        UpdateDate DATETIME,
        UpdatingIDUser INT NOT NULL DEFAULT '0',
        Deleted TINYINT NOT NULL DEFAULT '0',
        DeleteDate DATETIME,
        DeletingIDUser INT NOT NULL DEFAULT '0',
        Name CHAR(32) NOT NULL DEFAULT '',
        PermissionLevel CHAR(16) NOT NULL DEFAULT '',

        PRIMARY KEY (IDRole)
    );



--   [ Customer ]
CREATE TABLE IF NOT EXISTS
    Customer
    (
        IDCustomer INT UNSIGNED NOT NULL AUTO_INCREMENT,
        GUIDCustomer CHAR(36) NOT NULL DEFAULT '00000000-0000-0000-0000-000000000000',
        CreateDate DATETIME,
        CreatingIDUser INT NOT NULL DEFAULT '0',
        UpdateDate DATETIME,
        UpdatingIDUser INT NOT NULL DEFAULT '0',
        Deleted TINYINT NOT NULL DEFAULT '0',
        DeleteDate DATETIME,
        DeletingIDUser INT NOT NULL DEFAULT '0',
        Name CHAR(128) NOT NULL DEFAULT '',
        Code CHAR(24) NOT NULL DEFAULT '',
        Enabled TINYINT NOT NULL DEFAULT '0',

        PRIMARY KEY (IDCustomer)
    );
