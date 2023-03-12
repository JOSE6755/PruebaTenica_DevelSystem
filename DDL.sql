drop table respuesta;
drop table encuesta_campo;

drop table campo;
drop table tipo_campo;
drop table encuesta;
drop table usuario;

CREATE TABLE Usuario(
idUsuario int IDENTITY(1,1) PRIMARY KEY,
nombre varchar(200) not null,
correo varchar(400) not null,
contasenia varchar(200) not null
);
CREATE TABLE Encuesta(
idEncuesta int IDENTITY(1,1) PRIMARY KEY,
idUsuario int FOREIGN KEY REFERENCES usuario(idUsuario) ON DELETE CASCADE,
nombre varchar(200),
descripcion text
);

CREATE TABLE Tipo_campo(
idTipo_campo int IDENTITY(1,1) PRIMARY KEY,
tipo varchar(200) not null
);
insert into Tipo_campo(tipo) values('text');
insert into Tipo_campo(tipo) values('date');
insert into Tipo_campo(tipo) values('number');

CREATE TABLE Campo(
idCampo int IDENTITY(1,1) PRIMARY KEY,
titulo varchar(200),
requerido int,
idTipo_campo int FOREIGN KEY REFERENCES tipo_campo(idTipo_campo),
nombre varchar(200)
);

CREATE TABLE Encuesta_campo(
idEncuesta_campo int IDENTITY(1,1) PRIMARY KEY,
idEncuesta int FOREIGN KEY REFERENCES encuesta(idEncuesta) ON DELETE CASCADE,
idCampo int FOREIGN KEY REFERENCES campo(idCampo) ON DELETE CASCADE,
);

CREATE TABLE Respuesta(
idRespuesta int IDENTITY(1,1) PRIMARY KEY,
respuesta text,
idEncuesta_campo int FOREIGN KEY REFERENCES Encuesta_campo(idEncuesta_campo) ON DELETE CASCADE
);