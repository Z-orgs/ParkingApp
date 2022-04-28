CREATE TABLE userAdmin(
  idAdmin int AUTO_INCREMENT,
  userA varchar(30) NOT NULL UNIQUE,
  pword varchar(30) NOT NULL,
  priceType1 int DEFAULT 3000,
  priceType2 int DEFAULT 5000,
  priceType3 int DEFAULT 50000,
  priceType4 int DEFAULT 20000,
  PRIMARY KEY(idAdmin, userA)
)