import { FlatButtonDirective } from './flat-button.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<button tton></button>`
})
class TestComponent {}

describe('FlatButtonDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent, FlatButtonDirective]
    });

    fixture = TestBed.createComponent(TestComponent);
    el = fixture.elementRef;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new FlatButtonDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
