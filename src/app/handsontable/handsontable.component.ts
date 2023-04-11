import { Component, ElementRef, ViewChild, OnInit } from '@angular/core';
import Handsontable from 'handsontable';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-handsontable',
  templateUrl: './handsontable.component.html',
  styleUrls: ['./handsontable.component.css']
})


export class HandsontableComponent implements OnInit {

  tableData: any = [];

  @ViewChild("hotTable")
  hotTable!: ElementRef;



  constructor(private http: HttpClient) {

  }
  ngOnInit(): void {

    this.http.get('https://gorest.co.in/public/v2/users?access-token=7b319b308eb19b622798bbd47e959e1b301a43e48f3e6ccdad84a9746ba35525')
      .subscribe(data => {
        this.tableData = data;

        this.ngAfterViewInit()
      });
    // console.log(this.tableData);

  }


  ngAfterViewInit() {
    // console.log(typeof this.hotTable);
    console.log(this.tableData);

    const hotElement = this.hotTable.nativeElement;
    const hotSettings = {
      licenseKey: "non-commercial-and-evaluation",
      data: this.tableData,
      // colHeaders: ['Id', 'Title', 'Brand', 'Category', 'Price','rating', 'Stock'],      
      colHeaders: ['Id', 'Name', 'Email', 'Gender', 'Status'],
      // columnHeader: true,
      columns: [
        { type: 'numeric' },
        { type: 'text' },
        { type: 'text' },
        {
          type: dropdownMenu: [
            'remove_col',
            '---------',
            'make_read_only',
            '---------',
            'alignment'
          ] },
        // { type: 'date', dateFormat: 'M/D/YYYY' },
        { type: 'text' }
      ],
      rowHeaders: true,
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
