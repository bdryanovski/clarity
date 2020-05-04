/*
 * Copyright (c) 2016-2020 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ControlIdService } from './providers/control-id.service';
import { ClrControlSuccess } from './success';

@Component({ template: `<clr-control-success>Test error</clr-control-success>` })
class SimpleTest {}

@Component({ template: `<clr-control-success aria-describedby="hello"></clr-control-success>` })
class ExplicitAriaTest {}

export default function (): void {
  describe('ClrControlSuccess', () => {
    let fixture: ComponentFixture<SimpleTest>;

    beforeEach(function () {
      TestBed.configureTestingModule({
        declarations: [ClrControlSuccess, SimpleTest, ExplicitAriaTest],
        providers: [ControlIdService],
      });
      fixture = TestBed.createComponent(SimpleTest);
      fixture.detectChanges();
    });

    it('projects content', function () {
      expect(fixture.debugElement.query(By.directive(ClrControlSuccess)).nativeElement.innerText).toContain(
        'Test error'
      );
    });

    it('adds the .clr-subtext class to host', function () {
      expect(
        fixture.debugElement.query(By.directive(ClrControlSuccess)).nativeElement.classList.contains('clr-subtext')
      ).toBeTrue();
    });

    it('leaves the for aria-describedby untouched if it exists', function () {
      const explicitFixture = TestBed.createComponent(ExplicitAriaTest);
      explicitFixture.detectChanges();
      const message = explicitFixture.nativeElement.querySelector('clr-control-success');
      expect(message.getAttribute('aria-describedby')).toBe('hello');
    });
  });
}
