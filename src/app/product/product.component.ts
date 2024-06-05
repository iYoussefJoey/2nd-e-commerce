import { Component, OnInit } from '@angular/core';
import { CartapService } from '../cartap.service';
import { Prod } from '../prod';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { LimitPipe } from '../limit.pipe';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [CommonModule, HttpClientModule, LimitPipe],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css',
  providers: [CartapService],
})
export class ProductComponent implements OnInit {
  productList: Prod[] = [];
  constructor(private _CartapService: CartapService) {}
  ngOnInit(): void {
    // this._CartapService.fetchData().subscribe((Prod) => {
    //   this.productList = Prod
    // })
    this._CartapService.fetchData().subscribe({
      next: (Prod) => {
        this.productList = Prod;
      },
    });
  }
  addToCart(product: Prod): void {
    console.log(product);
    this._CartapService.addToCart(product);
  }
}
