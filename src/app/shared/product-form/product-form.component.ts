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
  loader:boolean=false;
  sizeId:number=0;
  
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
      size: this.formBuilder.array([this.createSize()]),
      image: ["",Validators.required],
      create_date: ["", Validators.required],
      expire_date: ["", Validators.required]
    })
  }

  ngOnInit() {

    this.initProductForm();
  }

  createSize() {
    this.sizeId++;
    return this.formBuilder.group({
      id: [this.sizeId],
      name: ["", Validators.required],
      price: ["", Validators.required]
    });
  }

  initProductForm():void {
    if (this.productId != undefined) {
      this.btn_text = 'Update'
      this.productService.getProductById(this.productId).subscribe(res => {
        if (res['success']) {

          let sizeControl = <FormArray>this.productForm.get('size');

          for (let i = 1; i <= res['data'].size.length - 1; i++) {
            sizeControl.push(this.createSize());
          }

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

  onClickAddSize():void{
    let sizeControl=<FormArray>this.productForm.get('size');
    sizeControl.push(this.createSize());
  }

  onClickRemoveSize(index):void{
    let sizeControl=<FormArray>this.productForm.get('size');
    sizeControl.removeAt(index);
  }

  save():void {
    this.loader=true;
    if (this.productId != undefined) {
      const product = this.productForm.value;
      this.subcription.push(this.productService.updateProduct(product).subscribe(res => {
        if (res['success']) {
          console.log(res)
          this.loader=false;
          this.toastrService.success('Update successful', 'Update', {
            timeOut: 3000
          });

        }
      },error=>{
        this.loader=false;
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

          setTimeout(t=>{
            this.loader=false;
            this.toastrService.success('Save successful', 'Save', {
              timeOut: 3000
            });
            this.router.navigate(['./cart-list'])
          },2000)

        }
      },error=>{
        this.loader=false;
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
