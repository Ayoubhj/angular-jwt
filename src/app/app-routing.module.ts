import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { LoginRegisterComponent } from './components/login-register/login-register.component';
import { AuthGuard } from './services/auth.guard';
import { ChartsComponent } from './components/charts/charts.component';
import { DataTableComponenet } from './components/dataTable/data-table.component';

const routes: Routes = [
 
   {
      path: 'home',
      component: HomePageComponent,
      canActivate : [AuthGuard],
      children: [
          {
              path: 'charts',
              component: ChartsComponent,
              canActivate : [AuthGuard]
          },
          {
            path: 'table',
            component: DataTableComponenet,
            canActivate : [AuthGuard]
           
        },
         
      ]
   },
   {
      path: "login-register",
      component: LoginRegisterComponent,
      
   }, 
   {
      path: "**",
      component: LoginRegisterComponent,
      
  
   }
];

@NgModule({
   imports: [RouterModule.forRoot(routes)],
   exports: [RouterModule],
   providers: [  AuthGuard,
     
    ],
})
export class AppRoutingModule { }
