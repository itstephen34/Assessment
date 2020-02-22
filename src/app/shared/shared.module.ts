import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmBoxComponent } from './component/confirm-box/confirm-box.component';
import { DragFilesDirective } from './directive/drag-files.directive';



@NgModule({
  declarations: [ConfirmBoxComponent, DragFilesDirective],
  imports: [
    CommonModule
  ],
  exports: [DragFilesDirective]
})
export class SharedModule { }
