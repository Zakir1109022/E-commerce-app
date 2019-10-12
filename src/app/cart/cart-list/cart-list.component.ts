import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material';
import { DialogComponent } from 'src/app/shared/dialog/dialog.component';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { CartService } from '../service/cart.service';
import { PageConfig } from 'src/app/model/page-config.model';

@Component({
  selector: 'app-cart-list',
  templateUrl: './cart-list.component.html',
  styleUrls: ['./cart-list.component.css']
})
export class CartListComponent implements OnInit, OnDestroy {

  subscription: Subscription[] = [];
  productlist: Product[] = [];
  loader:boolean=false;
  pageConfig:PageConfig;

  constructor(
    private router: Router,
    private cartService: CartService,
    public dialog: MatDialog,
    private toastrService: ToastrService
  ) { }

  ngOnInit() {
    this.pageConfig=new PageConfig();
    this.pageConfig.number=1;
    this.pageConfig.limit=10;
    this.getCartList()
  }


  getCartList(): void {
    this.loader=true;
    this.subscription.push(this.cartService.getCartList(this.pageConfig).subscribe(res => {
      console.log(res['success']);
      setTimeout(t=>{
        if (res['success']) {
          this.productlist =this.productlist.length>0 ? [...this.productlist,... res['data']] : res['data'];
        }
        this.loader=false;
      },2000)
     
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

  onScroll(){
   this.pageConfig.number++;
   this.getCartList();
  }


  ngOnDestroy() {
    this.subscription.forEach(s => {
      s.unsubscribe()
    })
  }

}
