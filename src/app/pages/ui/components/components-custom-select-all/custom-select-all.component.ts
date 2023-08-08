import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { DashboardService } from 'src/app/pages/dashboards/dashboard-analytics/dashboard.service';

@Component({
  selector: 'app-custom-select-all',
  templateUrl: "./custom-select-all.component.html",
  styleUrls: ['./custom-select-all.component.scss'],
})
export class CustomSelectAllComponent {
  @Input() model = [];
  @Input() values = [];
  @Input() text = 'Select All'; 

  constructor(private dashboardService: DashboardService) {

  }

  isChecked(): boolean {
    return this.model && this.values.length
      && this.model.length === this.values.length;
  }

  isIndeterminate(): boolean {
    return this.model && this.values.length && this.model.length
    && this.model.length < this.values.length ? true : false;
  }

  toggleSelection(change: MatCheckboxChange): void {
    if (change.checked) {
      this.dashboardService.selectStock(this.values.map(x => x.value));
    } else {
      this.dashboardService.selectStock([]);
    }
  }
}
