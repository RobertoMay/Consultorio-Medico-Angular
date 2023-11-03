import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './plantillas/header/header.component';
import { FooterComponent } from './plantillas/footer/footer.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { PanelComponent } from './pages/panel/panel.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { EditarMedicoComponent } from './pages/editar-medico/editar-medico.component';
import { NuevoMedicoComponent } from './pages/nuevo-medico/nuevo-medico.component';
import { CitasComponent } from './pages/citas/citas.component';
import { NuevoCitaComponent } from './pages/nuevo-cita/nuevo-cita.component';
import { EditarCitaComponent } from './pages/editar-cita/editar-cita.component';
import { HistorialMedicosComponent } from './pages/historial-medicos/historial-medicos.component';
import { EditarHistorialMedicoComponent } from './pages/editar-historial-medico/editar-historial-medico.component';
import { NuevoHistorialMedicoComponent } from './pages/nuevo-historial-medico/nuevo-historial-medico.component';
import { PrescripcionMedicaComponent } from './pages/prescripcion-medica/prescripcion-medica.component';
import { NuevoPrescripcionMedicaComponent } from './pages/nuevo-prescripcion-medica/nuevo-prescripcion-medica.component';
import { EditarPrescripcionMedicaComponent } from './pages/editar-prescripcion-medica/editar-prescripcion-medica.component';
import { ExamenMedicosComponent } from './pages/examen-medicos/examen-medicos.component';
import { NuevoExamenMedicoComponent } from './pages/nuevo-examen-medico/nuevo-examen-medico.component';
import { EditarExamenMedicoComponent } from './pages/editar-examen-medico/editar-examen-medico.component';
import { FacturasComponent } from './pages/facturas/facturas.component';
import { NuevoFacturaComponent } from './pages/nuevo-factura/nuevo-factura.component';
import { EditarFacturaComponent } from './pages/editar-factura/editar-factura.component';
import { HistorialPagosComponent } from './pages/historial-pagos/historial-pagos.component';
import { NuevoHistorialPagosComponent } from './pages/nuevo-historial-pagos/nuevo-historial-pagos.component';
import { EditarHistorialPagosComponent } from './pages/editar-historial-pagos/editar-historial-pagos.component';
import { PersonalComponent } from './pages/personal/personal.component';
import { NuevoPersonalComponent } from './pages/nuevo-personal/nuevo-personal.component';
import { EditarPersonalComponent } from './pages/editar-personal/editar-personal.component';
import { HorariosMedicosComponent } from './pages/horarios-medicos/horarios-medicos.component';
import { NuevoHorarioMedicoComponent } from './pages/nuevo-horario-medico/nuevo-horario-medico.component';
import { EditarHorarioMedicoComponent } from './pages/editar-horario-medico/editar-horario-medico.component';
import { UsuariosComponent } from './pages/usuarios/usuarios.component';
import { NuevoUsuarioComponent } from './pages/nuevo-usuario/nuevo-usuario.component';
import { EditarUsuarioComponent } from './pages/editar-usuario/editar-usuario.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    routingComponents,
    PanelComponent,
    MedicosComponent,
    EditarMedicoComponent,
    NuevoMedicoComponent,
    CitasComponent,
    NuevoCitaComponent,
    EditarCitaComponent,
    HistorialMedicosComponent,
    EditarHistorialMedicoComponent,
    NuevoHistorialMedicoComponent,
    PrescripcionMedicaComponent,
    NuevoPrescripcionMedicaComponent,
    EditarPrescripcionMedicaComponent,
    ExamenMedicosComponent,
    NuevoExamenMedicoComponent,
    EditarExamenMedicoComponent,
    FacturasComponent,
    NuevoFacturaComponent,
    EditarFacturaComponent,
    HistorialPagosComponent,
    NuevoHistorialPagosComponent,
    EditarHistorialPagosComponent,
    PersonalComponent,
    NuevoPersonalComponent,
    EditarPersonalComponent,
    HorariosMedicosComponent,
    NuevoHorarioMedicoComponent,
    EditarHorarioMedicoComponent,
    UsuariosComponent,
    NuevoUsuarioComponent,
    EditarUsuarioComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
