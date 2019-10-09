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
import { ProductFormModule } from '../shared/product-form/product-form.module';
import { ProductFormComponent } from '../shared/product-form/product-form.component';


const routes: Routes = [
    { path: '', component: CartComponent },
    { path: 'edit/:id', component: ProductFormComponent }
]


@NgModule({
    declarations:[CartComponent,CartListComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        CustomMaterialModule,
        ScrollingModule,
        DialogModule,
        ProductFormModule
    ],
    exports:[],
    entryComponents:[DialogComponent]
})


export class CartModule{}