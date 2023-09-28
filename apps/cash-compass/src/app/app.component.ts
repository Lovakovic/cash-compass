import { Component } from '@angular/core';

@Component({
  selector: 'cash-compass-root',
  template: `
    <div class="bg-primary min-h-screen flex flex-col items-center justify-center">
      <div class="w-full max-w-screen-lg">
        <router-outlet></router-outlet>
      </div>
    </div>
  `
})
export class AppComponent {
  title = 'cash-compass';
}
