import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from './account/account.component';
import { AdminComponent } from './admin/admin.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { CartComponent } from './cart/cart.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: BooksCatalogComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account', component: AccountComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
