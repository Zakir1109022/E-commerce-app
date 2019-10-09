import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from '../service/cart.service';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  productlist: Product[] = [];
  loader:boolean=false;

  constructor(
    private router: Router,
    private cartService: CartService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.getCartList()
  }


  getCartList(): void {
    this.loader=true;
    this.subscription.push(this.cartService.getCartList().subscribe(res => {
      console.log(res['success']);
      if (res['success']) {
        this.productlist = res['data'];
        this.loader=false;
      }
      else {
        this.productlist = [];
        this.loader=false;
      }
    }, error => {
      this.toastrService.success(error, 'Error', {
        timeOut: 3000
      });
    }))
  }


  onClickEdit(id): void {
    this.router.navigate(['./cart-list/edit/' + id])
  }

  onClickDelete(id): void {
    const dialogRef = this.dialog.open(DialogComponent, {
      width: '250px'
    });

    dialogRef.afterClosed().subscribe(res => {
      if (res.result) {
        this.loader=true;
        this.subscription.push(this.cartService.deleteCartItem(id).subscribe(res => {
          console.log(res['success']);
          if (res['success']) {
            this.productlist = res['data'];
            this.toastrService.success('Deleted Successfully', 'Delete', {
              timeOut: 3000
            });

            this.cartService.changeCartData({change:true})

            this.loader=false;
          }

        }))
      }
    }, error => {
      this.toastrService.success(error, 'Error', {
        timeOut: 3000
      });
    });
  }


  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe()
    })
  }

}
