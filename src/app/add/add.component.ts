import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {HttpProductServicesService} from "../services/http-product-services.service";

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {

  public productForm: FormGroup;

  constructor(private productService: HttpProductServicesService, private router: Router) {
    this.productForm = new FormGroup({
      name: new FormControl(null, [Validators.required,Validators.maxLength(64)]),
      article: new FormControl(null, [Validators.required,Validators.maxLength(11)]),
      price: new FormControl(null, [Validators.required,Validators.maxLength(20)]),
      maker: new FormControl(null, []),
      category: new FormControl(null, [Validators.required,Validators.maxLength(512)]),
      weight: new FormControl(null, [Validators.required,Validators.maxLength(32)]),
      count: new FormControl(null, [Validators.required,Validators.maxLength(11),Validators.min(1)])
    });
  }

  ngOnInit(): void {
  }

  async onProductFormSubmit() {
    try {
      const product = this.productForm.value; // Получаем значение из полей формы
      await this.productService.createProducts(product).subscribe((res) => {
        console.log(res);
      }); // Асинхронно отпраляем данные на сервер
      await this.router.navigate(['/list']);
    } catch (e) {
      console.error(e);
    }
  }

}
