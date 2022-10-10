import { Routes, RouterModule } from '@angular/router';
import { BuilderComponent } from './components/builder/builder.component';

const routes: Routes = [
  { path: '', component: BuilderComponent },
  { path: '**', redirectTo: '' },
];

export const appRoutingModule = RouterModule.forRoot(routes);
