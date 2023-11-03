import {Component} from '@angular/core';
import {animate, state, style, transition, trigger} from "@angular/animations";


@Component({
  selector: 'cash-compass-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  animations: [
    trigger('expandCollapse', [
      state('collapsed', style({ height: '0px', opacity: 0, overflow: 'hidden', padding: '0px' })),
      state('expanded', style({ height: '*', opacity: 1, overflow: 'hidden', padding: '*' })),
      transition('collapsed <=> expanded', [
        animate('500ms ease-in-out')
      ])
    ]),
    trigger('fadeInOut', [
      state('void', style({ opacity: 0 })),
      state('*', style({ opacity: 1 })),
      transition('void <=> *', [
        animate('500ms ease-in-out')
      ])
    ])
  ]
})
export class NavbarComponent {
  expanded = false;
  hovering = false;

  toggleExpanded(): void {
    this.expanded = !this.expanded;
  }

  mouseOver(): void {
    this.hovering = true;
  }

  mouseOut(): void {
    this.hovering = false;
  }

  protected readonly transition = transition;
}
