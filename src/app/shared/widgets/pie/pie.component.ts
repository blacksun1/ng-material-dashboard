import { Component, OnInit, Input } from "@angular/core";
import * as Highcharts from "highcharts";
import HC_EXPORTING from "highcharts/modules/exporting";

@Component({
  selector: "app-widget-pie",
  templateUrl: "./pie.component.html",
  styleUrls: ["./pie.component.scss"]
})
export class PieComponent implements OnInit {
  Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  @Input()
  data: any[] = [];

  constructor() {}

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        plotBackgroundColor: null,
        plotBorderWidth: null,
        plotShadow: false,
        type: "pie"
      },
      title: {
        text: "Browser market shares in January, 2018"
      },
      tooltip: {
        pointFormat: "{series.name}: <b>{point.percentage:.1f}%</b>"
      },
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: false,
      },
      accessibility: {
        point: {
          valueDescriptionFormat: "{point}%"
        }
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: "pointer",
          dataLabels: {
            enabled: true,
            format: "<b>{point.name}</b>: {point.percentage:.1f} %"
          }
        }
      },
      series: [
        {
          name: "Brands",
          type: "pie",
          colorByPoint: true,
          data: this.data,
        }
      ]
    };

    HC_EXPORTING(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event("resize"));
    }, 300);
  }
}
