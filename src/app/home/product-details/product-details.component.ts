import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ProductService } from '../service/product.service';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})
export class ProductDetailsComponent implements OnInit, OnDestroy {

  productId: string;
  subcription: Subscription[] = [];
  productDetails: Product;
  selecterSizePrice: number = 0;
  selecterSize: any;
  quantity: number = 1;
  loader: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService,
    private cartService: CartService,
    private toastrService: ToastrService
  ) {
    this.productId = this.route.snapshot.params.id;
  }

  ngOnInit() {
    this.getProductDetails()
  }


  getProductDetails(): void {
    this.loader = true;
    this.subcription.push(this.productService.getProductById(this.productId).subscribe(res => {
      console.log(res['success']);
      if (res['success']) {

        this.productDetails = res['data'];
        this.loader = false;


      }

    }, error => {
      this.toastrService.error(error, 'Error', {
        timeOut: 3000
      });
    }));
  }


  onClickDecrease() {
    if (this.quantity > 1) {
      this.quantity = this.quantity - 1;
    }
  }

  onClickIncrease() {
    if (this.quantity >= 1) {
      this.quantity = this.quantity + 1;
    }
  }


  onClickAddToCart() {
    this.loader = true;
    this.productDetails.quantity = this.quantity;
    this.productDetails.totalPrice = this.quantity * this.selecterSizePrice;
    this.productDetails.size = this.productDetails.size.filter(x => x.id == this.selecterSize.id)

    console.log(this.productDetails);
    this.subcription.push(this.cartService.addToCart(this.productDetails).subscribe(res => {
      if (res['success']) {

        setTimeout(t => {
          this.toastrService.success('Successful added to cart', 'Success', {
            timeOut: 3000
          });

          this.cartService.changeCartData({ change: true })

          this.loader = false;
        }, 2000)

      }
    }, error => {
      this.toastrService.error(error, 'Error', {
        timeOut: 3000
      });
    }))

  }


  onChangeSize(size) {
    console.log(size)
    this.selecterSize = size;
    this.selecterSizePrice = size.price;
  }

  onClickBack() {
    this.router.navigate(['./home']);
  }

  ngOnDestroy() {
    this.subcription.forEach(s => {
      s.unsubscribe();
    })
  }

}
