export interface ListaPacientesI {
    ID_Paciente: number;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: string;
    Genero: String;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
}

export interface PacienteI {
    ID_Paciente: number;
    Nombre: string;
    Apellido: string;
    FechaNacimiento: string;
    Genero: String | any;
    Direccion: string;
    Telefono: string;
    CorreoElectronico: string;
}

export interface LoginI {
    CorreoElectronico: string;
    Contraseña: string;
}

export interface ResponseI {
    status: boolean;
    data: any;
}

export interface MedicoI {
    ID_Medico: number;
    Nombre: string;
    Apellido: string;
    Especialidad: string;
    Telefono: string;
    CorreoElectronico: string;
}

export interface CitaI {
    ID_Cita: number;
    paciente: any;
    medico: any;
    FechaHoraCita: Date;
    MotivoCita: string;
    EstadoCita: string;
}

export interface CitaPostI {
    ID_Cita: number;
    ID_Paciente: number;
    ID_Medico: number;
    FechaHoraCita: Date;
    MotivoCita: string;
    EstadoCita: string;
}

export interface HistorialMedicoI {
    ID_Historial: number;
    paciente: any;
    FechaRegistro: Date;
    Diagnostico: string;
    Tratamiento: string;
    NotasMedicas: string;
}

export interface HistorialMedicoPostI {
    ID_Historial: number;
    ID_Paciente: number;
    FechaRegistro: Date;
    Diagnostico: string;
    Tratamiento: string;
    NotasMedicas: string;
}

export interface PrescripcionMedicaI {
    ID_Prescripcion: number;
    paciente: any;
    medico: any;
    Medicamento: string;
    Dosis: string;
    Frecuencia: string;
    FechaEmision: Date;
}

export interface PrescripcionMedicaPostI {
    ID_Prescripcion: number;
    ID_Paciente: number;
    ID_Medico: number;
    Medicamento: string;
    Dosis: string;
    Frecuencia: string;
    FechaEmision: Date;
}

export interface ExamenMedicoI {
    ID_Examen: number;
    paciente: any;
    TipoExamen: string;
    FechaExamen: Date;
    Resultados: String;
}

export interface ExamenMedicoPostI {
    ID_Examen: number;
    ID_Paciente: number;
    TipoExamen: string;
    FechaExamen: Date;
    Resultados: String;  
}

export interface FacturaI {
    ID_Factura: number;
    paciente: any;
    FechaFacturacion: Date;
    Total: number;
    EstadoPago: string;
}

export interface FacturaPostI {
    ID_Factura: number;
    ID_Paciente: number;
    FechaFacturacion: Date;
    Total: number;
    EstadoPago: string;
}

export interface HistorialPagosI {
    ID_HistorialPago: number;
    factura: any;
    FechaPago: Date;
    Monto: number;
}

export interface HistorialPagosPostI {
    ID_HistorialPago: number;
    ID_Factura: number;
    FechaPago: Date;
    Monto: number;
}

export interface PersonalConsultorioI {
    ID_Personal: number;
    Nombre: string;
    Apellido: string;
    Cargo: string;
    Telefono: string;
    CorreoElectronico: string; 
}

export interface HorariosMedicosI {
    ID_HorarioMedico: number;
    medico: any;
    DiaSemana: string;
    HoraInicio: string;
    HoraFin: string;
}

export interface HorariosMedicosPostI {
    ID_HorarioMedico: number;
    ID_Medico: number;
    DiaSemana: string;
    HoraInicio: string;
    HoraFin: string;
}

export interface UsuarioI {
    ID_Usuario: number;
    CorreoElectronico: string;
    Nombre: string;
    Contraseña: string;
    Rol: string;
}