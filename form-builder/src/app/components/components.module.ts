import { NgModule } from '@angular/core';
import { HeaderComponent } from './header/header.component';
import { BuilderComponent } from './builder/builder.component';
import { FormModule } from '../form-builder-sections/form.module';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [HeaderComponent, BuilderComponent],
  imports: [FormModule, CommonModule, MaterialModule],
  providers: [],
  exports: [HeaderComponent],
})
export class ComponentsModule {}
