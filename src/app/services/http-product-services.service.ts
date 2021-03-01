import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class HttpProductServicesService {

  constructor(public http: HttpClient) { }

  getProducts(id:number = 0) {
    return this.http.post('http://exam-api/',{'data':{'type':'get','id':id}});
  }

  createProducts(data: any = {}) {
    return this.http.post('http://exam-api/',{'data':{'type':'create','data':data}});
  }

  updateProducts(data: any = {},id: number) {
    return this.http.post('http://exam-api/',{'data':{'type':'update','data':data,'id':id}});
  }

  updateProductCount(id: number,plusminus: number) {
    return this.http.post('http://exam-api/',{'data':{'type':'updateCount','id':id,'plusminus':plusminus}});
  }

  deleteProducts(id: number){
    return this.http.post('http://exam-api/',{'data':{'type':'delete','id':id}});
  }
}
