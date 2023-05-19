import { Component, ElementRef, ViewChild, OnInit, AfterViewInit } from '@angular/core';
import Handsontable from 'handsontable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-handsontable',
  templateUrl: './handsontable.component.html',
  styleUrls: ['./handsontable.component.css']
})


export class HandsontableComponent implements OnInit, AfterViewInit {

  @ViewChild("hotTable")
  hotTable!: ElementRef;

  tableData: any = [];
  objecttoarray: any;



  constructor(private http: HttpClient) {

  }
  ngOnInit() {

    // function to fetch the data for the table from api
    this.http.get('https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525')
      .subscribe(data => {
        this.tableData = data;
        this.objecttoarray = this.tableData.map((x: { id: number; }) => Object.values(x))
        // console.log(this.objecttoarray)

        this.ngAfterViewInit()
      });

  }

  // function to create handsontable after view of the html component
  // this function is called inside the api fetch function
  ngAfterViewInit() {

    const hotElement = this.hotTable.nativeElement;
    const hotSettings = {
      licenseKey: "non-commercial-and-evaluation",
      data: this.objecttoarray,
      colHeaders: ['Id', 'Name', 'Email', 'Gender', 'Status'],
      columns: [
        { type: 'numeric', data: 0, readOnly: true },
        { type: 'text', data: 1 },
        { type: 'text', data: 2 },
        { type: 'dropdown', source: ['male', 'female'], allowInvalid: false, data: 3 },
        { type: 'dropdown', source: ['active', 'inactive'], allowInvalid: false, data: 4 }
      ],
      width: '100%',
      height: 400,
      customBorders: true,
      cellBorders: true,
      dropdownMenu: true,
      multiColumnSorting: true,
      filters: true,
      manualRowMove: true,
      manualColumnMove: true,
      bindRowsWithHeaders: true,

    };
    const hot = new Handsontable(hotElement, hotSettings);
  }

}
