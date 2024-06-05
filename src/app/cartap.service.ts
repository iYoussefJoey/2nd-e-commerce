import { HttpClient } from '@angular/common/http';
import { ChangeDetectorRef, Injectable, signal } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Prod } from './prod';
import { NotifyService } from './notify.service';

@Injectable({
  providedIn: 'root'
})
export class CartapService {
  itemsCount: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  itemsSignal = signal(0);
  removeFromCart(item: Prod) {
    const index = this.cartItems.findIndex(item => item.id === item.id);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
      this._notify.showSuccess('Item removed from cart');
    }
  }
  private cartItems: Prod[] =  [];
  storageKey =  'cartItems';
  constructor(private _httpclient: HttpClient, private _notify: NotifyService, private cdr: ChangeDetectorRef) { 
    const storeItems = localStorage.getItem(this.storageKey);
    if (storeItems) {
      this.cartItems = JSON.parse(storeItems);
    }
  }

  fetchData(): Observable<Prod[]> {
  return this._httpclient.get<Prod[]>('https://fakestoreapi.com/products');
  }
  addToCart(product: Prod)  {
    const existingItems = this.cartItems.find(item => item.id === product.id);
    if (existingItems) {
      existingItems.quantity++;
      this._notify.showSuccess(`${product.title} quantity increased: ${existingItems.quantity}`) ;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
      this.itemsCount.next(this.cartItems.length);
      this.itemsCount.asObservable().subscribe({
        next: (data) => {
          console.log("dataaaaaaaaaaaaaaaaaaaaaaa",data);
        }
      })
      this.itemsSignal.set(this.cartItems.length);
      console.log("this.itemsSignal",this.itemsSignal())
      this.cdr.detectChanges();
      this._notify.showSuccess(`${product.title} added to cart`);
    }
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  getCartItemsCount(): number {
    console.log(this.cartItems.length);
  return this.cartItems.length;
  }
  getCartItems():Prod[]{
    return this.cartItems;
  }

}
