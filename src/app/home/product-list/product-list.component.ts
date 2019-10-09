import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  subscription: Subscription[] = [];
  productlist: Product[] = [];
  loader:boolean=false;
  
  constructor(
    private router:Router,
    private productService:ProductService,
    private toastrService:ToastrService
  ) { }

  ngOnInit() {
    this.getProductList()
  }


  getProductList():void {
    this.loader=true;
    this.subscription.push(this.productService.getProductList().subscribe(res => {
      console.log(res['success']);
      if (res['success']) {
        this.productlist = res['data'];
      }
      else {
        this.productlist = [];
      }

      this.loader=false;
    },error=>{
      this.toastrService.error(error,'Error',{timeOut:3000})

      this.loader=false;
    }))
  }


  onClickProductImage(id){
    this.router.navigate(['./home/products/'+id])
  }

}
