import { Component, OnInit } from '@angular/core';
import {Product} from "../interface/product.interface";
import {HttpProductServicesService} from "../services/http-product-services.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  productList: Product [] = [];
  productListConst: Product [] = [];
  typeSortPrice: boolean = false;
  typeSortCount: boolean = false;
  typeFilterCount: boolean = false;

  constructor(private HttpProductServicesService: HttpProductServicesService) {}

  ngOnInit(): void {
    this.HttpProductServicesService.getProducts().subscribe((res) => {
      let data = JSON.parse(JSON.stringify(res));

      if(data.success){
        data = data.data;
        this.productList = data.map((item: any) => {
          return {
            id: item[0],
            name: item[1],
            article: item[2],
            price: item[3],
            maker: item[4],
            category: item[5],
            weight: item[6],
            count: item[7],
          }
        });
        this.productListConst = this.productList;
      }else{
        console.log('err');
      }
    });
  }

  async deleteProduct(id: number) {
    try {
      await this.HttpProductServicesService.deleteProducts(id).subscribe((res) => {
        console.log(res);
      });
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }

  async updateCountOfProduct(id: number, plusminus: number) {
    try {
      await this.HttpProductServicesService.updateProductCount(id,plusminus).subscribe((res) => {
        console.log(res);
      });
      this.ngOnInit();
    } catch (err) {
      console.log(err);
    }
  }

  filterByCategory(category: string,productList: Product[]) {
    productList = this.productListConst;
    if(category !== "")
      this.productList = productList.filter((subject) => subject.category === category);
    else
      this.productList = productList;
  }

  filterByCount(productList: Product[]) {
    this.typeFilterCount = !this.typeFilterCount;
    productList = this.productListConst;
    this.productList = productList.filter((subject) => this.typeFilterCount?(subject.count !== 0):(subject.count === 0));
  }

  sortByPrice(productList: Product[]){
    this.typeSortPrice = !this.typeSortPrice;
    this.productList = productList.sort((a, b) => {
      return this.typeSortPrice?(a.price - b.price):(b.price - a.price);
    });
  }

  sortByCount(productList: Product[]){
    this.typeSortCount = !this.typeSortCount;
    this.productList = productList.sort((a, b) => {
      return this.typeSortCount?(a.count - b.count):(b.count - a.count);
    });
  }
}
