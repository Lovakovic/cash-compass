import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[cashCompassRaisedButton]',
})
export class RaisedButtonDirective implements OnInit, OnChanges {
  @Input('cashCompassRaisedButton') buttonType: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
  @Input() disabled = false;

  constructor(private el: ElementRef, private renderer: Renderer2) { }

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

    button.classList.remove('bg-gray-300', 'cursor-not-allowed', 'border-gray-300', 'text-gray-500', `bg-${this.buttonType}`, 'text-white', `border-${this.buttonType}`);

    if (this.disabled) {
      button.setAttribute('disabled', 'true');
      button.classList.add('bg-gray-300', 'cursor-not-allowed', 'border-gray-300', 'text-gray-500');
    } else {
      button.removeAttribute('disabled');
      button.classList.add(`bg-${this.buttonType}`, 'text-white', 'border', `border-${this.buttonType}`, 'shadow-md');
    }
  }

  @HostListener('mouseenter') onMouseEnter() {
    if (this.disabled) {
      return;
    }
    this.el.nativeElement.classList.add('shadow-lg');
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.disabled) {
      return;
    }
    this.el.nativeElement.classList.remove('shadow-lg');
  }

  @HostListener('mousedown') onMouseDown() {
    if (this.disabled) {
      return;
    }
    this.renderer.setStyle(this.el.nativeElement, 'box-shadow', 'inset 0 3px 5px rgba(0, 0, 0, 0.125)');
  }

  @HostListener('mouseup') onMouseUp() {
    if (this.disabled) {
      return;
    }
    this.renderer.removeStyle(this.el.nativeElement, 'box-shadow');
  }
}
