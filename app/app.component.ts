import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { L10n, loadCldr } from '@syncfusion/ej2-base';

 declare var require: any;

 loadCldr(
   require('cldr-data/main/it/numbers.json'),
   require('cldr-data/main/it/currencies.json'),
   require('cldr-data/supplemental/numberingSystems.json'),
   require('cldr-data/supplemental/currencyData.json'),
   require("cldr-data/main/it/numbers.json"),
   require("cldr-data/main/it/ca-gregorian.json"),
   require("cldr-data/supplemental/numberingSystems.json"),
   require("cldr-data/main/it/timeZoneNames.json"),
   require('cldr-data/supplemental/weekdata.json')
 );

L10n.load({
  it: {
    datepicker: {
      today: 'oggi'
    },
    grid: {
      'SaveButton': 'Conferma',
      'CancelButton': 'Annulla'
    }
  }
});

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(http: HttpClient) {
  }

  title = 'PEF';
}
