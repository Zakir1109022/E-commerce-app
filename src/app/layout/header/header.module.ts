import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderCartComponent } from './header-cart/header-cart.component';




@NgModule({
    declarations:[HeaderComponent, HeaderCartComponent],
    imports:[
        CommonModule,
        RouterModule
    ],
    exports:[HeaderComponent]
})


export class HeaderModule{}