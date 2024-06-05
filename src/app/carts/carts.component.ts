import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { CartapService } from '../cartap.service';
import { Prod } from '../prod';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-carts',
  standalone: true,
  imports: [CommonModule,RouterModule],
  templateUrl: './carts.component.html',
  styleUrl: './carts.component.css',
  providers: [CartapService],
})
export class CartsComponent implements OnInit{
constructor(private _cartservice:CartapService){
  
}
cartItems:Prod[]=[];
totalAmount:number=0;
ngOnInit(): void {
  this.cartItems = this._cartservice.getCartItems();
  this.calculateAmount();
}
calculateAmount(){
  this.totalAmount = this.cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);

}
removeItem(item:Prod){
  this._cartservice.removeFromCart(item);
  this.calculateAmount();
}
}