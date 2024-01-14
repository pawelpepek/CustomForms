import { AfterViewInit, Component, Input } from '@angular/core';
import { IsObjectsEquals } from '../../../helpers/Comparision';
import { DataServiceBase } from '../../../services/data.services/data.service.base';

@Component({
  selector: 'xpp-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> implements AfterViewInit {
  @Input() service!: DataServiceBase<T>;

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.service.load();
    }, 10);
  }

  public isRowSelected = (row: T) =>
    IsObjectsEquals(row, this.service.selectedItem.value);

  onClick(row: T) {
    this.service.selectedItem.next(row);
  }
  onDelete(row: T) {
    this.service.delete(row);
  }
}
