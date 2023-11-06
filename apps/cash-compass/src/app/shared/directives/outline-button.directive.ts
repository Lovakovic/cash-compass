import { Directive, ElementRef, Renderer2, OnInit, Input, HostListener, OnChanges, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[cashCompassOutlineButton]',
})
export class OutlineButtonDirective implements OnInit, OnChanges {
  @Input('cashCompassOutlineButton') buttonType: 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' = 'primary';
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
    button.classList.remove('bg-gray-300', 'cursor-not-allowed', 'bg-transparent', `text-${this.buttonType}`, 'border', `border-${this.buttonType}`);

    if (this.disabled) {
      button.setAttribute('disabled', 'true');
      button.classList.add('bg-gray-300', 'cursor-not-allowed');
    } else {
      button.removeAttribute('disabled');
      button.classList.add('bg-transparent', `text-${this.buttonType}`, 'border', `border-${this.buttonType}`);
    }
  }

  @HostListener('mousedown') onMouseDown() {
    if (!this.disabled) {
      this.renderer.setStyle(this.el.nativeElement, 'border-width', '3px');
    }
  }

  @HostListener('mouseup') onMouseUp() {
    if (!this.disabled) {
      this.renderer.removeStyle(this.el.nativeElement, 'border-width');
    }
  }
}
