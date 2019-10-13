import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { ProductService } from '../service/product.service';
import { ToastrService } from 'ngx-toastr';
import { PageConfig } from 'src/app/model/page-config.model';
import { CartService } from 'src/app/cart/service/cart.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {


  subscription: Subscription[] = [];
  productlist: Product[] = [];
  loader:boolean=false;
  pageConfig:PageConfig=new PageConfig();
  
  constructor(
    private router:Router,
    private productService:ProductService,
    private cartService:CartService,
    private toastrService:ToastrService
  ) { 
    this.pageConfig.number=1;
    this.pageConfig.limit=10;
  }

  ngOnInit() {
    this.getProductList()
  }


  getProductList():void {
    this.loader=true;
    this.subscription.push(this.productService.getProductList(this.pageConfig).subscribe(res => {
      console.log(res['success']);
      
      setTimeout(t=>{
        if (res['success']) {
          this.productlist =this.productlist.length>0 ? [...this.productlist,...res['data']] : res['data'];
        }
       
        this.loader=false;
      },2000)
    },error=>{
      this.toastrService.error(error,'Error',{timeOut:3000})

      this.loader=false;
    }))
  }


  onClickAddToCart(product:Product){
    product.quantity=1;
    product.totalPrice = product.size[0].price * product.quantity;

    this.subscription.push(this.cartService.addToCart(product).subscribe(res=>{
      if(res['success']){
       this.cartService.changeCartData({ change: true,toggleCart:false })
        this.productlist.map(p=>{
          if(p.id==product.id){
            p['quantity']=res['cartAddedProduct'].quantity;
          }
        })
      }
    })) 
  }

  onClickPlusQuantity(product:Product){
    product.quantity=1;
    product.totalPrice = product.size[0].price * product.quantity;

    this.subscription.push(this.cartService.addToCart(product).subscribe(res=>{
      if(res['success']){
       this.cartService.changeCartData({ change: true,toggleCart:false })
        this.productlist.map(p=>{
          if(p.id==product.id){
            p['isAddedToCart']=true;
            p['quantity']=res['cartAddedProduct'].quantity;
          }
        })
      }
    })) 
  }

  onClickMinusQuantity(product:Product){
    if(product.quantity>1)
    {
      product.quantity=-1;
      product.totalPrice = product.size[0].price * product.quantity;
  
      this.subscription.push(this.cartService.addToCart(product).subscribe(res=>{
        if(res['success']){
         this.cartService.changeCartData({ change: true,toggleCart:false })
          this.productlist.map(p=>{
            if(p.id==product.id){
              p['isAddedToCart']=true;
              p['quantity']=res['cartAddedProduct'].quantity;
            }
          })
        }
      })) 
    }
   
  }

  onClickViewProduct(id){
    this.router.navigate(['./home/products/'+id])
  }


  onScroll(){
   this.pageConfig.number++;
   this.getProductList();
  }

}
