import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { CartService } from 'src/app/cart/service/cart.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy {


  is_showCart: boolean = false;

  subcription: Subscription[] = [];
  cartlist: Product[] = [];
  cartItemCount: number = 0;

  constructor(
    private cartService: CartService,
    private toastrService: ToastrService
  ) {

  }

  ngOnInit() {


    this.cartService.cartDataChange.subscribe(res => {
      if (res != null) {
        if (res['change']) {
          this.getCartList();
        }
      }
    })


    this.getCartList();
  }




  getCartList(): void {
    this.subcription.push(this.cartService.getCartList().subscribe(res => {
      console.log(res['success']);
      if (res['success']) {
        this.cartlist = res['data'];
      }
      else {
        this.cartlist = [];
      }
    }, error => {
      this.toastrService.error(error, 'Error', { timeOut: 3000 })
    }))
  }


  getCartItemCount(): number {
    return this.cartlist.length;
  }



  onClickCartCount(is_open: boolean) {
    this.is_showCart = !is_open;
  }

  ngOnDestroy() {
    this.subcription.forEach(s => {
      s.unsubscribe();
    })
  }

}
