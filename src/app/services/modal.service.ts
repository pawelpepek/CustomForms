import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { tap } from 'rxjs';

interface DictionaryRef {
  [key: string]: TemplateRef<any>;
}

@Injectable({ providedIn: 'root' })
export class ModalService {
  dialogRefs: DictionaryRef = {};

  constructor(private ngModalService: NgbModal) {}

  public addDialogRef(name: string, dialogRef: TemplateRef<any>) {
    this.dialogRefs[name] = dialogRef;
  }

  public showModal = (name: string) => {
    setTimeout(() => {
      this.ngModalService.open(this.dialogRefs[name], { centered: true });
    }, 10);
  };

  public modalTap = <S>(name: string) =>
    tap((x: S) => {
      this.showModal(name);
    });
}
