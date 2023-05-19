import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';

const routes: Routes = [
   {
      path: "",
      component: HomePageComponent,

   },
   {
      path: "login-register",
      component: LoginRegisterComponent,
   },
   {
      path: "**",
      component: HomePageComponent,

   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule]
})
export class AppRoutingModule { }
