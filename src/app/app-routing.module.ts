import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AddComponent} from "./add/add.component";
import {MainComponent} from "./main/main.component";
import {EditComponent} from "./edit/edit.component";
import {ListComponent} from "./list/list.component";

const routes: Routes = [
  {path: '', component: MainComponent},
  {path: 'list', component: ListComponent},
  {path: 'add', component: AddComponent},
  {path: 'edit/:id', component: EditComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
