import { Component, OnInit } from '@angular/core';
import {ProductsService} from "../../services/products.service";
import {Product} from "../../model/product.model";
import {Observable, of} from "rxjs";
import {catchError, map, startWith} from "rxjs/operators";
import {AppDataState, DataStateEnum} from "../../../state/product.state";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products$ :Observable<AppDataState<Product[]>>|null=null;
  readonly  DataStateEnum=DataStateEnum;

  constructor(private productService : ProductsService,private router:Router) { }

  ngOnInit(): void {
  }

  onGetAllProducts() {


    // @ts-ignore
    this.products$=this.productService.getAllProducts().pipe(
      map(data=>({dataState : DataStateEnum.Loaded, data:data})),
      catchError(err=>of({dataState :DataStateEnum.Error, errorMessage:err.message}))


    );

  }

  OnGetSelectedProducts() {
    // @ts-ignore
    this.products$=this.productService.getSelectedProducts().pipe(
      map(data=>({dataState : DataStateEnum.Loaded, data:data})),
      catchError(err=>of({dataState :DataStateEnum.Error, errorMessage:err.message}))


    );

  }

  OnGetAvailableProducts() {
    // @ts-ignore
    this.products$=this.productService.getAvailableProducts().pipe(
      map(data=>({dataState : DataStateEnum.Loaded, data:data})),
      catchError(err=>of({dataState :DataStateEnum.Error, errorMessage:err.message}))


    );
  }

  onSearch(dataForm: any) {
    // @ts-ignore
    this.products$=this.productService.searchProducts(dataForm.keyword).pipe(
      map(data=>({dataState : DataStateEnum.Loaded, data:data})),
      catchError(err=>of({dataState :DataStateEnum.Error, errorMessage:err.message}))


    );
  }



  onDelete(p: Product) {
    let v=confirm("Etes vous sûre? ");
    if(v==true)
    this.productService.deleteProduct(p)
      .subscribe(data=>{
        this.onGetAllProducts();
      })
  }

  OnNewProduct() {
    this.router.navigateByUrl("/newProduct")
  }

  onSelect(p: Product) {
    this.productService.select(p)
      .subscribe(data=>{
        p.selected=data.selected;
      })
  }

  onEdit(p: Product)  {
    this.router.navigateByUrl("/editProduct/"+p.id);
  }
}
