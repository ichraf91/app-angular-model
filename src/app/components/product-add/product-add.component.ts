import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Product} from "../../model/product.model";
import {ProductsService} from "../../services/products.service";

@Component({
  selector: 'app-product-add',
  templateUrl: './product-add.component.html',
  styleUrls: ['./product-add.component.css']
})
export class ProductAddComponent implements OnInit {
  productFormGroup!: FormGroup ;
  submitted:boolean=false;
  constructor(private fb:FormBuilder,private productService:ProductsService) { }

  ngOnInit(): void {
    this.productFormGroup=this.fb.group({

      name:["",Validators.required],
      price:[0,Validators.required],
      quantity:[0,Validators.required],
      selected:[true,Validators.required],
      available:[true,Validators.required],


    });
  }

  onSaveProduct() {
    this.submitted=true;
    if(this.productFormGroup.invalid)return;
    this.productService.save(this.productFormGroup.value)
  .subscribe(data=>{
    alert("Success Saving Product");
  });
  }
}
