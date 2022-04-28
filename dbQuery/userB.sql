CREATE TABLE userB(
  id int AUTO_INCREMENT,
  fullName nvarchar(50) not NULL,
  inDebt DOUBLE,
  tel char(10),
  addr text,
  Admin varchar(30) NOT NULL,
  PRIMARY KEY(id),
  FOREIGN KEY(Admin) REFERENCES userAdmin(userA)
)