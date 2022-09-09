import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { ModalModule } from 'ngx-bootstrap/modal';
import { TooltipModule } from 'ngx-bootstrap/tooltip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BooksCatalogComponent } from './books-catalog/books-catalog.component';
import { NavbarComponent } from './navbar/navbar.component';
import { AdminComponent } from './admin/admin.component';
import { CreditsModalComponent } from './modals/credits-modal/credits-modal.component';
import { CartComponent } from './cart/cart.component';
import { AccountComponent } from './account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AddBookModalComponent } from './modals/add-book-modal/add-book-modal.component';
import { ConfirmComponent } from './modals/confirm/confirm.component';
import { LoginModalComponent } from './modals/login-modal/login-modal.component';
import { FirstVisitModalComponent } from './modals/first-visit-modal/first-visit-modal.component';
import { BookDetailsModalComponent } from './modals/book-details-modal/book-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksCatalogComponent,
    NavbarComponent,
    AdminComponent,
    CreditsModalComponent,
    CartComponent,
    AccountComponent,
    AddBookModalComponent,
    ConfirmComponent,
    LoginModalComponent,
    FirstVisitModalComponent,
    BookDetailsModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ToastrModule.forRoot({ positionClass: 'toast-bottom-right' }),
    BrowserAnimationsModule,
    ReactiveFormsModule,
    ModalModule.forRoot(),
    TooltipModule.forRoot(),
    FormsModule

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
