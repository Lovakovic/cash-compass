import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[cashCompassFlatButton]',
})
export class FlatButtonDirective implements OnInit, OnChanges {
  @Input('cashCompassFlatButton') buttonType: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() disabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.setInitialStyle();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('disabled' in changes || 'buttonType' in changes) {
      this.setInitialStyle();
    }
  }

  private setInitialStyle() {
    const button = this.el.nativeElement;
    button.classList.remove('bg-gray-300', 'cursor-not-allowed', `text-${this.buttonType}`);

    if (this.disabled) {
      button.setAttribute('disabled', 'true');
      button.classList.add('bg-gray-300', 'cursor-not-allowed');
    } else {
      button.removeAttribute('disabled');
      button.classList.add(`text-${this.buttonType}`);
    }
  }

  @HostListener('mousedown') onMouseDown() {
    if (!this.disabled) {
      this.renderer.setStyle(this.el.nativeElement, 'font-weight', 'bold');
    }
  }

  @HostListener('mouseup') onMouseUp() {
    if (!this.disabled) {
      this.renderer.removeStyle(this.el.nativeElement, 'font-weight');
    }
  }
}
