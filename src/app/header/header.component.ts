import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit, signal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CartapService } from '../cartap.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterModule, CommonModule, HttpClientModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
  providers: [CartapService],
})
export class HeaderComponent implements OnInit {
  total = signal(0);
  constructor(private _cart: CartapService, private cdr: ChangeDetectorRef) {}
  ngOnInit(): void {
    this.total.set(this._cart.getCartItemsCount());
    console.log("from hrererererer")
  }
  // getCartItemsCount(): number {
  //   // return this._cart.itemsSignal();
  //   // return this.total;

  // }
}
