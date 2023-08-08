import { Component } from '@angular/core';
import { stockListData } from '../../../../static-data/stock-list-data';
import { DashboardService } from 'src/app/pages/dashboards/dashboard-analytics/dashboard.service';
import { DashboardAPIService } from 'src/app/services/dashboard.service';
import { forkJoin } from 'rxjs';
import moment from 'moment';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'vex-dashboard-analytics',
  templateUrl: './dashboard-analytics.component.html',
  styleUrls: ['./dashboard-analytics.component.scss']
})
export class DashboardAnalyticsComponent {
  stockList = stockListData;
  selectedStock$ = this.dashboardService.selectedStock$;
  selectedDate$ = this.dashboardService.selectedDate$;
  selectedDate = null;
  selectedStocks = [];
  tableColumns = [];
  tableData = [];
  threshold = 7;
  dateSelection = { start: null, end: null }

  chartData = {
    chart: {
      caption: "Hisse Senedi Analizi",
      yaxisname: "Hisse Senedi Kapanış Fiyatı",
      showhovereffect: "1",
      drawcrossline: "1",
      plottooltext: "<b>$dataValue</b> closing value of $seriesName",
      theme: "umber"
    },
    categories: [
      {
        category: [],
      }
    ],
    dataset: []
  };

  constructor(private dashboardService: DashboardService, private dashboardAPIService: DashboardAPIService, private snackBar: MatSnackBar) { 
    this.selectedStock$.subscribe(obs => {
      this.selectedStocks = obs;
      console.log(this.selectedStocks, "Selected Stocks");
    })
    
    this.selectedDate$.subscribe(obs => {
      this.selectedDate = obs;
      console.log(this.selectedDate, "Selected Date");
    })

    this.dashboardService.headerList$.subscribe((obs) => {
      this.tableColumns = [
        {
          label: '',
          property: 'symbol',
          type: 'text',
          cssClasses: "table-symbol",
          sort: false
        },
      ];

      const limitedData = obs.map(x => ({
        label: x,
        property: x,
        type: 'text'
      }))
      this.tableColumns.push(...limitedData);

      // Update Chart YAxis with headers
      this.chartData.categories[0].category = obs.map(x => ({ 
        label: x,
      }));

    });

    this.dashboardService.stockData$.subscribe((obs) => {
      this.tableData = obs;

      this.chartData.dataset = this.tableData.map((x, xi) => ({
        seriesname: x.symbol,
        data: this.chartData.categories[0].category.map(y => ({ value: this.tableData[xi][y.label] })),
      }));
      console.log("Dataset", this.chartData);
    });
  }

  triggerSelect(event) {
    if (event.value.includes('all')) {
      this.dashboardService.selectStock(stockListData.map(x => x.value)); // ["IBM", "ABA"]
    } else {
      this.dashboardService.selectStock(event.value);
    }
  }

  triggerDateChange(event, type: 'start'| 'end') {
    this.dateSelection[type] = moment(event.value).format('DD-MM-YYYY');
    if (type === 'end') {
      this.dashboardService.selectDate(this.dateSelection);
    }
  }

  selectAll(event) {
    console.log(event, "Select All");
  }

  getServerData() {
    const requests = this.selectedStocks.map((x) => (this.dashboardAPIService.getStockData(x)));
    
    forkJoin(requests).subscribe((res) => {
      const error = res.find(x => x['Note']);
      if (error) {
        this.snackBar.open(error["Note"], "Close", {
          horizontalPosition: 'end',
          verticalPosition: 'bottom',
          duration: 3000,
        })
      } else {
        this.dashboardService.updateStockData(res);
      }
    })
    
  }

}
