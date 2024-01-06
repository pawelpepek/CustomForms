import { Component, Input } from '@angular/core';
import { DataService } from '../../../services/data.service';
import { IsObjectsEquals } from '../../../helpers/Comparision';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss',
})
export class TableComponent<T> {
  @Input() service!: DataService<T>;

  public isRowSelected = (row: T) =>
    IsObjectsEquals(row, this.service.selectedItem.value);

  onClick(row: T) {
    this.service.selectedItem.next(row);
  }
  onDelete(row: T) {
    this.service.delete(row);
  }
}
