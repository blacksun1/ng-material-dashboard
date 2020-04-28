import { Component, OnInit, Input } from '@angular/core';
import { Subject } from 'rxjs';
import { map, tap, filter } from 'rxjs/operators';
import csvtojson from 'csvtojson';

const ceil10 = (value: number): number => Math.ceil(value * 10) / 10;

const toDecimalTime = (hours: number, minutes: number, seconds: number): number => hours + (ceil10(((minutes + seconds / 60) / 60)));

function stringTimeToDecimalTime(value: string) {
  const [hours, minutes, seconds] = value.split(':');

  return toDecimalTime(+hours, +minutes, +seconds);
}

@Component({
  selector: 'app-widget-file',
  templateUrl: './file.component.html',
  styleUrls: ['./file.component.scss']
})
export class FileComponent implements OnInit {
  @Input()
  file: any;

  isImage = false;
  isTable = false;
  src$ = new Subject();
  formattedSrc$ = this.src$.pipe(
    tap(src => {
      console.log('src', src);
    }),
    map((results: any[]) => {
      let mondayTotal = 0;
      let tuesdayTotal = 0;
      let wednesdayTotal = 0;
      let thursdayTotal = 0;
      let fridayTotal = 0;
      let saturdayTotal = 0;
      let sundayTotal = 0;

      const newResults = results
        .filter((v, i) => i > 0)
        .map(row => {
          const projectCode = row.field4.substr(row.field4.indexOf('(') + 1).replace(')', '');
          const projectName = row.field4.substr(0, row.field4.indexOf('(')).trim();
          const monday = stringTimeToDecimalTime(row.field6);
          mondayTotal += monday;
          const tuesday = stringTimeToDecimalTime(row.field7);
          tuesdayTotal += tuesday;
          const wednesday = stringTimeToDecimalTime(row.field8);
          wednesdayTotal += wednesday;
          const thursday = stringTimeToDecimalTime(row.field9);
          thursdayTotal += thursday;
          const friday = stringTimeToDecimalTime(row.field10);
          fridayTotal += friday;
          const saturday = stringTimeToDecimalTime(row.field11);
          saturdayTotal += saturday;
          const sunday = stringTimeToDecimalTime(row.field12);
          sundayTotal += sunday;

          return ({
            projectName,
            projectCode,
            monday,
            tuesday,
            wednesday,
            thursday,
            friday,
            saturday,
            sunday,
          });
        });
      newResults.push({
          projectName: 'Total',
          projectCode: '',
          monday: mondayTotal,
          tuesday: tuesdayTotal,
          wednesday: wednesdayTotal,
          thursday: thursdayTotal,
          friday: fridayTotal,
          saturday: saturdayTotal,
          sunday: sundayTotal,
        });

      return {
          total: mondayTotal + tuesdayTotal + wednesdayTotal + thursdayTotal + fridayTotal + saturdayTotal + sundayTotal,
          tableData: newResults,
        };
    })
  );

  tableDisplayedColumns: string[] = ['ProjectName', 'ProjectCode', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  constructor() {}

  ngOnInit(): void {
    switch (this.file.type) {
      case 'image/jpeg':
      case 'image/png':
      case 'image/gif':
        this.handleImage();
        break;
      case 'text/csv':
        this.handleCSV();
        break;
    }
  }

  private async handleImage() {
    this.isImage = true;

    const reader = new FileReader();
    reader.onload = e => {
      this.src$.next(e.target.result);
    };
    reader.readAsDataURL(this.file);
  }

  private handleCSV() {
    this.isTable = true;

    const reader = new FileReader();
    reader.onload = async e => {
      if (typeof e.target.result === 'string') {
        const result = await this.parseCSV(e.target.result);
        this.src$.next(result);
      }
    };
    reader.readAsText(this.file);
  }

  private async parseCSV(csv: string) {
    const result = csvtojson({ noheader: true }).fromString(csv);

    return await result;
  }
}
