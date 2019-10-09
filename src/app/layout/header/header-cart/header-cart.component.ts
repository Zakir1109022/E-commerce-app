import { Component, OnInit, Input } from '@angular/core';
import { Product } from 'src/app/model/product.model';



@Component({
  selector: 'app-header-cart',
  templateUrl: './header-cart.component.html',
  styleUrls: ['./header-cart.component.css']
})
export class HeaderCartComponent implements OnInit {

  @Input('cartItems') cartItems: Product[];


  constructor(
  ) {

  }

  ngOnInit() {

  }




}
