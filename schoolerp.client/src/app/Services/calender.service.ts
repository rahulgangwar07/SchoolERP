import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CalenderService {

  constructor() { }

  calenderDay: number[] = Array.from({ length: 31 }, (_, i) => i + 1);
  calenderMonth: { [key: number]: string } = {
    1: 'January', 2: 'February', 3: 'March', 4: 'April', 5: 'May', 6: 'June', 7: 'July',
    8: 'August', 9: 'September', 10: 'October', 11: 'November', 12: 'December'
  };
  calenderYear: number[] = [2023, 2024, 2025, 2026, 2027];

}
