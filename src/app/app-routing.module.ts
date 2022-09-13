import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { CartComponent } from './cart/cart.component';
import { LoginComponent } from './login/login.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { AuthGuard } from './services/auth-guard.service';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksCatalogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account', canActivate: [AuthGuard], component: AccountComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'no-access', canActivate: [AuthGuard], component: ConfirmComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
