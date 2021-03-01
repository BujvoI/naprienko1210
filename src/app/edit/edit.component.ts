import {Component, OnInit} from '@angular/core';
import {Product} from "../interface/product.interface";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {HttpProductServicesService} from "../services/http-product-services.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  public selectedProduct: Product | undefined;
  public id: number  | undefined;
  public name: string  | undefined;
  public article: number  | undefined;
  public price: number  | undefined;
  public maker: string  | undefined;
  public category: string  | undefined;
  public weight: string  | undefined;
  public count: number  | undefined;
  productFormUpdate: FormGroup;
  constructor(private productService: HttpProductServicesService, private activatedRouter: ActivatedRoute, private router: Router) {
    this.productFormUpdate = new FormGroup({
      id: new FormControl(null),
      name: new FormControl(null, [Validators.required,Validators.maxLength(64)]),
      article: new FormControl(null, [Validators.required,Validators.maxLength(11)]),
      price: new FormControl(null, [Validators.required,Validators.maxLength(20)]),
      maker: new FormControl(null, []),
      category: new FormControl(null, [Validators.required,Validators.maxLength(512)]),
      weight: new FormControl(null, [Validators.required,Validators.maxLength(32)]),
      count: new FormControl(null, [Validators.required,Validators.maxLength(11),Validators.min(1)])
    });
  }

  async ngOnInit() {
    try {
      this.activatedRouter.params.subscribe(param => {
        this.id = param.id;
      });
      // @ts-ignore
      this.selectedProduct = await this.productService.getProducts(this.id).subscribe((res) => {
        let data = JSON.parse(JSON.stringify(res));//не костыль, а фича...
        this.selectedProduct =  data.success ? data.data : [];
        this.id = this.selectedProduct?this.selectedProduct.id:undefined;
        this.name = this.selectedProduct?this.selectedProduct.name:undefined;
        this.article = this.selectedProduct?this.selectedProduct.article:undefined;
        this.price = this.selectedProduct?this.selectedProduct.price:undefined;
        this.maker = this.selectedProduct?this.selectedProduct.maker:undefined;
        this.category = this.selectedProduct?this.selectedProduct.category:undefined;
        this.weight = this.selectedProduct?this.selectedProduct.weight:undefined;
        this.count = this.selectedProduct?this.selectedProduct.count:undefined;
      });
    } catch (e) {
      console.log(e);
    }
  }
  async onEditProductFormSubmit() {
    try {
      await this.productService.updateProducts(this.productFormUpdate.value,this.productFormUpdate.value.id).subscribe((res) => {
        console.log(res)
      });
      await this.router.navigate(['/list']);
    } catch (err) {
      console.log(err);
    }
  }

}
