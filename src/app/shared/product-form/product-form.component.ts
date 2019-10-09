import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/home/service/product.service';
import { ToastrService } from 'ngx-toastr';
import {Location} from '@angular/common';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy {


  productForm: FormGroup;
  subcription: Subscription[] = [];
  productId: number;
  btn_text:string = 'Save'
  invalid_size:boolean = false;
  img_upload_error: boolean;
  size_list = [{id:1, name: 'Xl', price: '' }, {id:2, name: 'M', price: '' }, {id:3, name: 'S', price: '' }];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private productService: ProductService,
    private toastrService: ToastrService,
    private location: Location
    
  ) {
    this.productId = this.route.snapshot.params.id;

    this.productForm = this.formBuilder.group({
      id: [""],
      name: ["", Validators.required],
      description: ["", Validators.required],
      size: this.formBuilder.array([]),
      image: ["",Validators.required],
      create_date: ["", Validators.required],
      expire_date: ["", Validators.required]
    })
  }

  ngOnInit() {
    const control = <FormArray>this.productForm.get('size');
    this.size_list.forEach(x => {
      control.push(this.createSize(x))
    })

    this.initProductForm();
  }

  createSize(size) {
    return this.formBuilder.group({
      id: [size.id],
      name: [size.name, Validators.required],
      price: [size.price, Validators.required]
    });
  }

  initProductForm():void {
    if (this.productId != undefined) {
      this.btn_text = 'Update'
      this.productService.getProductById(this.productId).subscribe(res => {
        if (res['success']) {
          this.productForm.patchValue(res['data']);
        }
      })
    }
  }

  onClickBack():void {
    this.location.back();
  }

  onClickCancel():void {
    this.productForm.reset();
  }

  save():void {
    if (this.productId != undefined) {
      const product = this.productForm.value;
      this.subcription.push(this.productService.updateProduct(product).subscribe(res => {
        if (res['success']) {
          console.log(res)
          this.toastrService.success('Update successful', 'Update', {
            timeOut: 3000
          });

        }
      },error=>{
        this.toastrService.error(error,'Error',{timeOut:3000})
      }));

    }
    else {
      console.log(this.productForm.value)
      let productId;
      this.productService.getAutoProductId().subscribe(
        res => {
          productId = res['id'];
        }
      );
      this.productForm.get('id').setValue(productId);

      const product = this.productForm.value;
      this.subcription.push(this.productService.addProduct(product).subscribe(res => {
        if (res['success']) {
          console.log(res)
          this.toastrService.success('Save successful', 'Save', {
            timeOut: 3000
          });

        }
      },error=>{
        this.toastrService.error(error,'Error',{timeOut:3000})
      }))
    }

  }


  readImg(e):void {
    this.imageView(<File>e.target.files[0]);
  }

  imageView(i):void {
    let size = this.checkImageSize(i, 0.05);

    if (size) {
      this.invalid_size = false;
      let reader = new FileReader();
      reader.onload = e => {
        this.productForm.get("image").setValue(reader.result);
        console.log(reader.result);
      };
      reader.readAsDataURL(i);
    } else {
      this.invalid_size = true;
    }
  }

  checkImageSize(file, limit):boolean {
    let fileSize = file.size / 1024 / 1024;
    console.log(fileSize);
    if (fileSize > limit) {
      return false;
    } else {
      return true;
    }
  }



  ngOnDestroy() {
    this.subcription.forEach(sub => {
      sub.unsubscribe();
    })
  }

}
