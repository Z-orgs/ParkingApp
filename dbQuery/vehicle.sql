CREATE TABLE vehicle(
    idV int AUTO_INCREMENT,
    license VARCHAR(20) NOT NULL UNIQUE,
    type VARCHAR(15) not NULL,
    id int not NULL,
    Admin varchar(50) NOT NULL,
    PRIMARY KEY(idV),
    FOREIGN KEY(id) REFERENCES userB(id),
    FOREIGN KEY(Admin) REFERENCES userAdmin(userA)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4