import { Component, OnInit, Input} from "@angular/core";
import * as Highcharts from "highcharts";
import HC_EXPORTING from 'highcharts/modules/exporting';

@Component({
  selector: "app-widget-area",
  templateUrl: "./area.component.html",
  styleUrls: ["./area.component.scss"]
})
export class AreaComponent implements OnInit {
  @Input()
  data: any[];

  Highcharts: typeof Highcharts = Highcharts;
  chartOptions: Highcharts.Options = {};

  ngOnInit(): void {
    this.chartOptions = {
      chart: {
        type: "area"
      },
      title: {
        text: "Random Data"
      },
      subtitle: {
        text: "Demo"
      },
      tooltip: {
        split: true,
        valueSuffix: " millions"
      },
      exporting: {
        enabled: true,
      },
      credits: {
        enabled: false
      },
      series: (this.data || []).map(datum => ({...datum, type: 'area' })),
    };

    HC_EXPORTING(this.Highcharts);

    setTimeout(() => {
      window.dispatchEvent(new Event('resize'));
    }, 300);
  }
}
