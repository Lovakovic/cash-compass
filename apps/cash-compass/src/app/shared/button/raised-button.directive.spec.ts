import { RaisedButtonDirective } from './raised-button.directive';
import { ElementRef, Renderer2 } from '@angular/core';
import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component } from '@angular/core';

@Component({
  template: `<button cashCompassRaisedButton></button>`
})
class TestRaisedComponent {}

describe('RaisedButtonDirective', () => {
  let fixture: ComponentFixture<TestRaisedComponent>;
  let el: ElementRef;
  let renderer: Renderer2;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestRaisedComponent, RaisedButtonDirective]
    });

    fixture = TestBed.createComponent(TestRaisedComponent);
    el = fixture.elementRef;
    renderer = fixture.componentRef.injector.get<Renderer2>(Renderer2);

    fixture.detectChanges();
  });

  it('should create an instance', () => {
    const directive = new RaisedButtonDirective(el, renderer);
    expect(directive).toBeTruthy();
  });
});
