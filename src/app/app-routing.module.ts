import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { EditarComponent } from './pages/editar/editar.component';
import { NuevoComponent } from './pages/nuevo/nuevo.component';
import { PanelComponent } from './pages/panel/panel.component';
import { MedicosComponent } from './pages/medicos/medicos.component';
import { EditarMedicoComponent } from './pages/editar-medico/editar-medico.component';
import { NuevoMedicoComponent } from './pages/nuevo-medico/nuevo-medico.component';
import { CitasComponent } from './pages/citas/citas.component';
import { EditarCitaComponent } from './pages/editar-cita/editar-cita.component';
import { NuevoCitaComponent } from './pages/nuevo-cita/nuevo-cita.component';
import { HistorialMedicosComponent } from './pages/historial-medicos/historial-medicos.component';
import { NuevoHistorialMedicoComponent } from './pages/nuevo-historial-medico/nuevo-historial-medico.component';
import { EditarHistorialMedicoComponent } from './pages/editar-historial-medico/editar-historial-medico.component';
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

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  {path:'login', component:LoginComponent},
  { path:'dashboard', component:PanelComponent },
  {path:'pacientes', component:DashboardComponent},
  {path:'editar/:id', component:EditarComponent},
  {path:'nuevo', component:NuevoComponent},
  {path:'medicos', component:MedicosComponent},
  {path:'editar-medico/:id', component:EditarMedicoComponent},
  {path:'nuevo-medico', component:NuevoMedicoComponent},
  {path:'citas', component:CitasComponent},
  {path:'nuevo-cita', component:NuevoCitaComponent},
  {path:'editar-cita/:id', component:EditarCitaComponent},
  {path:'historial-medicos', component:HistorialMedicosComponent},
  {path:'nuevo-historial-medico', component:NuevoHistorialMedicoComponent},
  {path:'editar-historial-medico/:id', component:EditarHistorialMedicoComponent},
  {path:'prescripcion-medicas', component:PrescripcionMedicaComponent},
  {path:'nuevo-prescripcion-medica', component:NuevoPrescripcionMedicaComponent},
  {path:'editar-prescripcion-medica/:id', component:EditarPrescripcionMedicaComponent},
  {path:'examen-medicos', component:ExamenMedicosComponent},
  {path:'nuevo-examen-medico', component:NuevoExamenMedicoComponent},
  {path:'editar-examen-medico/:id', component:EditarExamenMedicoComponent},
  {path:'facturas', component:FacturasComponent},
  {path:'nuevo-factura', component:NuevoFacturaComponent},
  {path:'editar-factura/:id', component:EditarFacturaComponent},
  {path:'historial-pagos', component:HistorialPagosComponent},
  {path:'nuevo-historial-pago', component:NuevoHistorialPagosComponent},
  {path:'editar-historial-pago/:id', component:EditarHistorialPagosComponent},
  {path:'personal', component:PersonalComponent},
  {path:'nuevo-personal', component:NuevoPersonalComponent},
  {path:'editar-personal/:id', component:EditarPersonalComponent},
  {path:'horarios-medicos', component:HorariosMedicosComponent},
  {path:'nuevo-horario-medico', component:NuevoHorarioMedicoComponent},
  {path:'editar-horario-medico/:id', component:EditarHorarioMedicoComponent},
  {path:'usuarios', component:UsuariosComponent},
  {path:'nuevo-usuario', component:NuevoUsuarioComponent},
  {path:'editar-usuario/:id', component:EditarUsuarioComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [LoginComponent, DashboardComponent, NuevoComponent, EditarComponent]