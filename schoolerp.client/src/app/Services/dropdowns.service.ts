import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DropdownsService {

  constructor() { }

  // Original calenderMonth object
  calenderMonth: { [key: number]: string } = {
    1: 'January', 2: 'February', 3: 'March',
    4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };

  // Method to get sorted months as an array of {key, value}
  getSortedMonths(): { key: number, value: string }[] {
    return Object.entries(this.calenderMonth)
      .map(([key, value]) => ({ key: +key, value })) // Convert to an array of objects
      .sort((a, b) => a.key - b.key); // Sort by month number
  }

  calenderYear: number[] = [2023, 2024, 2025, 2026, 2027,2028,2029,2030];
}
