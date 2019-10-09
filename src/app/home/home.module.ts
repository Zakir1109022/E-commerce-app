import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { ProductFormComponent } from './product-form/product-form.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    {path:'add-product',component:ProductFormComponent},
    {path:'products/edit/:id',component:ProductFormComponent}
]


@NgModule({
    declarations:[HomeComponent, ProductListComponent, ProductDetailsComponent,ProductFormComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        CustomMaterialModule,
        FormsModule,
        ScrollingModule,
        ReactiveFormsModule
    ],
    exports:[
       
    ]
})


export class HomeModule{}