import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';
import { AuthService } from '../guard/auth.service';
import { GuardAvoidService } from '../guard/guard-avoid.service';

const routes: Routes = [
  {
    path: '',canActivate:[GuardAvoidService],
    component: HomePage,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomePageRoutingModule {}
