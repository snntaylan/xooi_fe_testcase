import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WidgetLargeChartComponent } from './widget-large-chart.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ChartModule } from '../../chart/chart.module';


// Import angular-fusioncharts
import { FusionChartsModule } from 'angular-fusioncharts';

// Import FusionCharts library and chart modules
import * as FusionCharts from 'fusioncharts';
import * as Charts from 'fusioncharts/fusioncharts.charts';

import * as FusionTheme from 'fusioncharts/themes/fusioncharts.theme.fusion';

// Pass the fusioncharts library and chart modules
FusionChartsModule.fcRoot(FusionCharts, Charts, FusionTheme);


@NgModule({
  declarations: [WidgetLargeChartComponent],
  imports: [
    CommonModule,
    MatIconModule,
    MatButtonModule,

    ChartModule,
    FusionChartsModule
  ],
  exports: [WidgetLargeChartComponent]
})
export class WidgetLargeChartModule {
}
