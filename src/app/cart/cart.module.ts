import { NgModule } from '@angular/core';
import { CartComponent } from './cart.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { CartListComponent } from './cart-list/cart-list.component';
import { DialogModule } from '../shared/dialog/dialog.module';
import { DialogComponent } from '../shared/dialog/dialog.component';


const routes: Routes = [
    { path: '', component: CartComponent }
]


@NgModule({
    declarations:[CartComponent,CartListComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        CustomMaterialModule,
        ScrollingModule,
        DialogModule
    ],
    exports:[],
    entryComponents:[DialogComponent]
})


export class CartModule{}