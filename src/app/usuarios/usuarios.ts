import { Url } from "url";

export interface usuario{
    id_user?: number;
    first_name?: string;
    last_name?: string;
    type_id?: string;
    num_id?: number;
    email?: string;
    estado?: string;
    password?: string;
    photoURL?:Url,
    biometric_date?: number;
    created_at?: string;
    updated_at?: string; 
}
