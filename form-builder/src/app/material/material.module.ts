import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatDialogModule } from '@angular/material/dialog';

const MaterialComponents = [
  MatButtonModule,
  CdkAccordionModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule,
  MatSelectModule,
  MatCheckboxModule,
  DragDropModule,
  MatDialogModule,
];

@NgModule({
  exports: [MaterialComponents],
  imports: [MaterialComponents],
})
export class MaterialModule {}
