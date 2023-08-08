import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatSelectModule } from '@angular/material/select';
import { CustomSelectAllComponent } from './custom-select-all.component';

@NgModule({
  imports: [
    MatSelectModule, MatCheckboxModule
  ],
  exports: [
    MatSelectModule, MatCheckboxModule, CustomSelectAllComponent
  ],
  declarations: [CustomSelectAllComponent]
})
export class CustomMaterialModule {
}