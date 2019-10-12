import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list/product-list.component';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { CustomMaterialModule } from '../shared/custom-material.module';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ProductFormModule } from '../shared/product-form/product-form.module';
import { ProductFormComponent } from '../shared/product-form/product-form.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'products/:id', component: ProductDetailsComponent },
    {path:'add-product',component:ProductFormComponent}
]


@NgModule({
    declarations:[HomeComponent, ProductListComponent, ProductDetailsComponent],
    imports:[
        CommonModule,
        RouterModule.forChild(routes),
        CustomMaterialModule,
        FormsModule,
        InfiniteScrollModule,
        ProductFormModule
    ],
    exports:[
       
    ]
})


export class HomeModule{}