import { Component, OnInit, Input } from '@angular/core';
import * as Highcharts from "highcharts";
import HC_EXPORTING from 'highcharts/modules/exporting';

@Component({
  selector: 'app-widget-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input()
  label: string;

  @Input()
  total: string;

  @Input()
  percentage: string

  @Input()
  data: number[]

  constructor() { }

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: "area",
        backgroundColor: null,
        borderWidth: 0,
        margin: [2, 2, 2, 2],
        height: 60
      },
      title: {
        text: null
      },
      subtitle: {
        text: null
      },
      tooltip: {
        split: true,
        outside: true,
      },
      legend: {
        enabled: true,
      },
      exporting: {
        enabled: false,
      },
      credits: {
        enabled: false
      },
      series: [
        {
          data: this.data,
          type: "area",
        }
      ],
      xAxis: {
        labels: {
          enabled: true,
        },
        title: {
          text: null
        },
        startOnTick: true,
        endOnTick: true,
      },
      yAxis: {
        labels: {
          enabled: true,
        },
        title: {
          text: null
        },
        startOnTick: true,
        endOnTick: true,
      },
    };

    HC_EXPORTING(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }

}
