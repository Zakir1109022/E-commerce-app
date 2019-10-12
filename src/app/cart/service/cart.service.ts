import { Injectable } from '@angular/core';
import { Observable, Observer, BehaviorSubject } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { PageConfig } from 'src/app/model/page-config.model';



@Injectable({
    providedIn: 'root'
})

export class CartService {

    private cartDataChangeSubject = new BehaviorSubject<any>(null);
    cartDataChange = this.cartDataChangeSubject.asObservable();

    constructor() { }

    changeCartData(data) {
        this.cartDataChangeSubject.next(data);
    }

    getCartItemById(id): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let CartList = [];
            CartList = JSON.parse(localStorage.getItem('CartList'));
            const product = CartList.find(x => x.id == id);

            observer.next({ success: true, data: product })
        })
    }

    addToCart(product: Product): Observable<any> {
        return new Observable((observer) => {
            let CartList = [];
            let storageCartList = JSON.parse(localStorage.getItem('CartList'));
            CartList = storageCartList != undefined ? storageCartList : [];
            CartList.push(product);

            localStorage.setItem('CartList', JSON.stringify(CartList));
            observer.next({ success: true })
        });
    }


    updateCartItem(productForm: Product): Observable<any> {
        return new Observable((observer) => {
            let CartList = [];
            CartList = JSON.parse(localStorage.getItem('CartList'));
            CartList.map((product: Product) => {
                if (product.id == productForm.id) {
                    product.size = productForm.size;
                    product.quantity = productForm.quantity;
                    product.totalPrice = productForm.totalPrice;
                }
            })

            localStorage.setItem('CartList', JSON.stringify(CartList));
            observer.next({ success: true })
        });
    }


    getCartList(pageConfig?:PageConfig): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let CartList = [];
            let storageCartList = JSON.parse(localStorage.getItem('CartList'));
            CartList = storageCartList != undefined ? storageCartList : [];

            if(pageConfig !=undefined)
            {
                const startIndex=((pageConfig.number-1)*pageConfig.limit);
                const endIndex=pageConfig.number*pageConfig.limit;
                CartList=CartList.slice(startIndex,endIndex);
            }
            

            observer.next({ success: true, data: CartList })
        })
    }



    deleteCartItem(id): Observable<any> {
        return new Observable((observer) => {
            let CartList = [];
            CartList = JSON.parse(localStorage.getItem('CartList'));

            let newCartList = CartList.filter(x => x.id != id);
            localStorage.setItem('CartList', JSON.stringify(newCartList));

            observer.next({ success: true, data: newCartList })
        });
    }





}
