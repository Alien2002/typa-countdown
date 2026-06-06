// import { Component, signal } from '@angular/core';
// import { RouterOutlet } from '@angular/router';

// @Component({
//   selector: 'app-root',
//   imports: [RouterOutlet],
//   templateUrl: './app.html',
//   styleUrl: './app.css'
// })
// export class App {
//   protected readonly title = signal('typa-countdown');
// }


import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './app.html',
  styleUrls: ['./app.css']
})
export class App implements OnInit, OnDestroy {
  constructor(private cdr: ChangeDetectorRef) {}
  targetDate = new Date('2026-06-12T21:00:00+03:00').getTime();
  days: string = '--';
  hours: string = '--';
  minutes: string = '--';
  seconds: string = '--';
  private interval?: number;

  ngOnInit() {
    this.startCountdown();
  }

  ngOnDestroy() {
    if (this.interval) clearInterval(this.interval);
  }

  startCountdown() {
    // update immediately, then every second
    const update = () => {
      const now = Date.now();
      const diff = this.targetDate - now;

      if (diff <= 0) {
        this.days = this.hours = this.minutes = this.seconds = '00';
        this.cdr.detectChanges();
        return;
      }

      this.days = Math.floor(diff / 86400000).toString().padStart(2, '0');
      this.hours = Math.floor((diff % 86400000) / 3600000).toString().padStart(2, '0');
      this.minutes = Math.floor((diff % 3600000) / 60000).toString().padStart(2, '0');
      this.seconds = Math.floor((diff % 60000) / 1000).toString().padStart(2, '0');
      this.cdr.detectChanges();
    };

    update();
    this.interval = window.setInterval(update, 1000);
  }
}
