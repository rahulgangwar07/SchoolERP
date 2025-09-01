import { Component, OnInit } from '@angular/core';
import { AssetsInventoryService } from '../../../../Services/assets-inventory.service';

@Component({
  selector: 'app-view-asset-deploye-report',
  templateUrl: './view-asset-deploye-report.component.html',
  styleUrls: ['./view-asset-deploye-report.component.css']
})
export class ViewAssetDeployeReportComponent implements OnInit {

  salesData: any[] = [];  // Original sales data
  filteredSalesData: any[] = [];  // Filtered sales data

  selectedDeploymentArea: string = 'all';  // Default filter value for deployment area
  selectedSellDate: string = 'all';  // Default filter value for sell date

  constructor(private _assetInventoryService: AssetsInventoryService) { }

  ngOnInit(): void {
    this.loadSalesData();
  }

  loadSalesData(): void {
    this._assetInventoryService.getAssetDeployeReport().subscribe({
      next: (data) => {
        this.salesData = data;
        this.filteredSalesData = data;   
      },
      error: (err) => console.error('Error loading sales data:', err),
    });
  }
   
  filterData(): void {
    this.filteredSalesData = this.salesData.filter(item => { 
      const isDeploymentAreaMatch = this.selectedDeploymentArea === 'all' || item.deployment_area_id === this.selectedDeploymentArea;
       
      const isSellDateMatch = this.selectedSellDate === 'all' || item.sell_date === this.selectedSellDate;

      return isDeploymentAreaMatch && isSellDateMatch;
    });
  }
   
  onFilterChange(): void {
    this.filterData();
  }
}
