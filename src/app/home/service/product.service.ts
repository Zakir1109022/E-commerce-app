import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';
import { Product } from 'src/app/model/product.model';
import { PageConfig } from 'src/app/model/page-config.model';



@Injectable({
    providedIn: 'root'
})

export class ProductService {

    constructor() { }


    getAutoProductId(): Observable<any> {
        let productList = [];
        let storageProductList = JSON.parse(localStorage.getItem('ProductList'));
        productList = storageProductList != undefined ? storageProductList : [];

        let productId = productList.length == 0 ? 1 : Math.max.apply(Math, productList.map(x => { return x.id })) + 1;

        return new Observable((observer) => {
            observer.next({ id: productId });
        });

    }

    getProductById(id): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let productList = [];
            productList = JSON.parse(localStorage.getItem('ProductList'));
            const product = productList.find(x => x.id == id);

            observer.next({ success: true, data: product })
        })
    }

    addProduct(product: ProductService): Observable<any> {
        return new Observable((observer) => {
            let productList = [];
            let storageProductList = JSON.parse(localStorage.getItem('ProductList'));
            productList = storageProductList != undefined ? storageProductList : [];
            productList.push(product);

            localStorage.setItem('ProductList', JSON.stringify(productList));
            observer.next({ success: true })
        });
    }


    updateProduct(productForm: Product): Observable<any> {
        return new Observable((observer) => {
            let productList = [];
            productList = JSON.parse(localStorage.getItem('ProductList'));
            productList.map((product: Product) => {
                if (product.id == productForm.id) {
                    product.name = productForm.name;
                    product.description = productForm.description;
                    product.size = productForm.size;
                    product.create_date = productForm.create_date;
                    product.expire_date = productForm.expire_date;
                    product.image = productForm.image;
                }
            })

            localStorage.setItem('ProductList', JSON.stringify(productList));
            observer.next({ success: true })
        });
    }


    getProductList(pageConfig?:PageConfig): Observable<any> {
        return new Observable<any>((observer: Observer<any>) => {
            let productList = [];
            let storageProductList = JSON.parse(localStorage.getItem('ProductList'));
            productList = storageProductList != undefined ? storageProductList : [];
            const startIndex=((pageConfig.number-1)*pageConfig.limit);
            const endIndex=pageConfig.number*pageConfig.limit;
             productList=productList.slice(startIndex,endIndex);

            observer.next({ success: true, data: productList})
        })
    }



    deleteProduct(id): Observable<any> {
        return new Observable((observer) => {
            let productList = [];
            productList = JSON.parse(localStorage.getItem('ProductList'));

            let newProductList = productList.filter(x => x.id != id);
            localStorage.setItem('ProductList', JSON.stringify(newProductList));

            observer.next({ success: true, data: newProductList })
        });
    }





}
