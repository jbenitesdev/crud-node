create database crud01 ;

use crud01;

create table pessoa (id int primary key auto_increment, nome varchar(255), email varchar(255), senha int)

insert into pessoa values(null, "belem","belem@gmail.com","123")