export interface usuario{
    iduser?: number;
    idficha?: number;
    first_name?: string;
    last_name?: string;
    type_id?: string;
    num_id?: number;
    email?: string;
    cellphone?: number;
    rol?: string;
    status?: string;
    password?: string;
    biometric_date?: string;
    created_at?: string;
    updated_at?: string;
}
/*
Este código define una interfaz llamada "usuario" que describe las propiedades de un objeto de usuario en TypeScript. Estas
propiedades incluyen el ID de usuario, el ID de ficha, el nombre y apellido del usuario, el tipo y número de identificación, el
correo electrónico, el número de celular, el rol, el estado, la contraseña, la fecha de biometría, la fecha de creación y la
fecha de actualización. Todas estas propiedades son opcionales ya que tienen un signo de interrogación al final.*/
