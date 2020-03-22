import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { PeriodicElement } from 'src/app/modules/dashboard.service';
import { MatTableDataSource } from '@angular/material/table'
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-widget-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  inputs: ['data']
})
export class TableComponent implements OnInit {
  set data(value: PeriodicElement[]) {
    this.dataSource = new MatTableDataSource<PeriodicElement>(value);
  }
  dataSource: MatTableDataSource<PeriodicElement>;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];

  constructor() { }

  ngOnInit(): void {
    this.dataSource.paginator = this.paginator;
  }
}
