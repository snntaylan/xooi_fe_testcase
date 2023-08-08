import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiService } from './shared/api.service';

@Injectable({
  providedIn: 'root'
})
export class DashboardAPIService {

  constructor(private api: ApiService) {}
  
  getStockData(symbol: string, ) {
    let headers = {}
    let params = new HttpParams();
    // params.set('function', 'TIME_SERIES_DAILY')
    // params.set('symbol', symbol)
    return this.api.get(`/query?function=TIME_SERIES_DAILY&apikey=GIG2BYX95JUC5D1Z&symbol=${symbol}`);
  }
}
