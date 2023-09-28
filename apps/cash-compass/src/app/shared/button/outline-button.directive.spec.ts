import { OutlineButtonDirective } from './outline-button.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<button cashCompassOutlineButton></button>`
})
class TestOutlineComponent {}

describe('OutlineButtonDirective', () => {
  let fixture: ComponentFixture<TestOutlineComponent>;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestOutlineComponent, OutlineButtonDirective]
    });

    fixture = TestBed.createComponent(TestOutlineComponent);
    el = fixture.elementRef;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new OutlineButtonDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
