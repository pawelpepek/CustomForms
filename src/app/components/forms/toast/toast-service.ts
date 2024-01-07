import { Injectable } from '@angular/core';

export interface Toast {
  classname?: string;
  delay?: number;
  label: string;
}

@Injectable({ providedIn: 'root' })
export class ToastService {
  toasts: Toast[] = [];

  lastMessage: string = '';

  private show(toast: Toast): void {
    this.toasts.push(toast);
  }

  remove(toast: Toast): void {
    this.toasts = this.toasts.filter((t) => t !== toast);
  }

  clear(): void {
    this.toasts.splice(0, this.toasts.length);
  }

  public showToast(color: 'success' | 'danger' | 'primary', label: string): void {
    this.show({
      classname: `bg-${color} text-light`,
      delay: 5000,
      label,
    });
  }
}
