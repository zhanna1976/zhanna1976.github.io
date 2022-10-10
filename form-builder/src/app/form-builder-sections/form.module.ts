import { NgModule } from '@angular/core';
import { StyleFromComponent } from './style-from/style-from.component';
import { CreatedFormComponent } from './created-form/created-form.component';
import { FormItemsComponent } from './form-items/form-items.component';
import { MaterialModule } from '../material/material.module';
import { CommonModule } from '@angular/common';
import { PixelPipePipe } from './pipes/pixel-pipe.pipe';
import { DeleteDialogComponent } from './delete-dialog/delete-dialog.component';
import { InputItemComponent } from './input-item/input-item.component';
import { TextareaItemComponent } from './textarea-item/textarea-item.component';
import { SelectItemComponent } from './select-item/select-item.component';
import { ButtonItemComponent } from './button-item/button-item.component';
import { CheckboxItemComponent } from './checkbox-item/checkbox-item.component';

@NgModule({
  declarations: [
    StyleFromComponent,
    FormItemsComponent,
    CreatedFormComponent,
    PixelPipePipe,
    DeleteDialogComponent,
    InputItemComponent,
    TextareaItemComponent,
    SelectItemComponent,
    ButtonItemComponent,
    CheckboxItemComponent,
  ],
  imports: [MaterialModule, CommonModule],
  providers: [],
  exports: [
    CreatedFormComponent,
    StyleFromComponent,
    FormItemsComponent,
    DeleteDialogComponent,
    InputItemComponent,
  ],
  entryComponents: [DeleteDialogComponent],
})
export class FormModule {}
