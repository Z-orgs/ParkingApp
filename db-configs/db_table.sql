CREATE TABLE userAdmin(
  idAdmin int AUTO_INCREMENT,
  userA varchar(30) NOT NULL UNIQUE,
  pword varchar(30) NOT NULL,
  PRIMARY KEY(idAdmin, userA)
)
go
  CREATE TABLE userB(
    id int AUTO_INCREMENT,
    fullName nvarchar(50) not NULL,
    inDebt DOUBLE,
    tel char(10),
    addr text,
    PRIMARY KEY(id)
  )
go
  CREATE TABLE vehicle(
    idV int AUTO_INCREMENT,
    license VARCHAR(20) NOT NULL UNIQUE,
    type VARCHAR(15) not NULL,
    id int not NULL,
    PRIMARY KEY(idV),
    CONSTRAINT FK_ID FOREIGN KEY(id) REFERENCES userB(id)
  )