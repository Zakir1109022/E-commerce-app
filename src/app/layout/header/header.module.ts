import { NgModule } from '@angular/core';
import {  RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header.component';
import { HeaderCartComponent } from './header-cart/header-cart.component';
import { CustomMaterialModule } from 'src/app/shared/custom-material.module';




@NgModule({
    declarations:[HeaderComponent, HeaderCartComponent],
    imports:[
        CommonModule,
        RouterModule,
        CustomMaterialModule
    ],
    exports:[HeaderComponent]
})


export class HeaderModule{}