import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  private _selectedStockSubject = new BehaviorSubject<string[]>([]);
  selectedStock$ = this._selectedStockSubject.asObservable();
  
  private _selectedDateSubject = new BehaviorSubject<{start: Date, end: Date}>(null);
  selectedDate = null;
  selectedDate$ = this._selectedDateSubject.asObservable();
  
  private _stockDataSubject = new BehaviorSubject<any[]>([]);
  stockData$ = this._stockDataSubject.asObservable();
  
  private _headerListSubject = new BehaviorSubject<any[]>([]);
  headerList$ = this._headerListSubject.asObservable();

  selectStock(value: string[]) {
    this._selectedStockSubject.next(value);
  }
  
  selectDate(value: {start: Date, end: Date}) {
    this.selectedDate = value;
    this._selectedDateSubject.next(value);
  }
  
  updateStockData(value: any[]) {
    const data = value.map(x => this.restructureData(x));
    this._stockDataSubject.next(data);
  }

  private restructureData(data: any) {
    const keynames = {meta: "Meta Data", daily: "Time Series (Daily)"};
    let headerList = Object.keys(data[keynames.daily]).map(x => moment(x).format("DD-MM-YYYY"));

    headerList = headerList.filter(x => moment(x, "DD-MM-YYYY") >= moment(this.selectedDate.start, "DD-MM-YYYY") && moment(x, "DD-MM-YYYY") <= moment(this.selectedDate.end, "DD-MM-YYYY"))
    
    this._headerListSubject.next(headerList);

    const symbol = data[keynames.meta]["2. Symbol"]; // :( 2. Symbol is defined in their API
    
    Object.keys(data[keynames.daily]).forEach(x => {
      const keyFormatChange = moment(x).format('DD-MM-YYYY');
      data[keynames.daily][keyFormatChange] = data[keynames.daily][x]["4. close"];
      data[keynames.daily][x] = data[keynames.daily][x]["4. close"];
    });

    data = data[keynames.daily];
    data.symbol = symbol;
    
    return data;
  }
}
