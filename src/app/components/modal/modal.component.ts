import {
  AfterViewInit,
  Component,
  Input,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modal') modal!: TemplateRef<any>;
  @Input() title!: string;
  @Input() name!: string;

  constructor(private modalService:ModalService){}

  ngAfterViewInit(): void {
    this.modalService.addDialogRef(this.name, this.modal);
  }
}
