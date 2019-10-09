import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ProductFormComponent } from './product-form.component';
import { CustomMaterialModule } from '../custom-material.module';



@NgModule({
    declarations:[ProductFormComponent],
    imports:[
        CommonModule,
        ReactiveFormsModule,
        CustomMaterialModule
    ],
    exports:[ProductFormComponent]
})

export class ProductFormModule{}