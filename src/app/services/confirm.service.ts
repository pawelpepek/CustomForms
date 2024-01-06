import { Injectable, TemplateRef } from '@angular/core';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { Subject, first, tap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ConfirmService {
  dialogRef!: TemplateRef<any>;
  question: string = '';

  private answer = new Subject<boolean>();

  constructor(private ngModalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  public showModal = (question: string) => {
    this.answer.next(false)
    this.question = question;
    setTimeout(() => {
      this.ngModalService.open(this.dialogRef, { centered: true });
    }, 10);

    return this.answer .pipe(first());
  };

  public modalTap = <S>(name: string) =>
    tap((x: S) => {
      this.showModal(name);
    });

  ok = (): void => this.answer.next(true);
  no = (): void => this.answer.next(false);
}
