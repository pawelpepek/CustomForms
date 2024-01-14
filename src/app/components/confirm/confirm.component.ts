import {
  AfterViewInit,
  Component,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ConfirmService } from '../../services/confirm.service';

@Component({
  selector: 'xpp-comfirm',
  templateUrl: './confirm.component.html',
})
export class ConfirmComponent implements AfterViewInit {
  @ViewChild('confirm') modal!: TemplateRef<any>;

  constructor(public confirmService: ConfirmService) {}

  ngAfterViewInit(): void {
    this.confirmService.dialogRef = this.modal;
  }

  no(modal: any) {
    modal.dismiss('Cross click');
    this.confirmService.no();
  }
  ok(modal: any) {
    modal.dismiss('Cross click');
    this.confirmService.ok();
  }
}
