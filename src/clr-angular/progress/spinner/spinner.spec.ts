/*
* Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
* This software is released under MIT license.
* The full license information can be found in LICENSE in the root directory of this project.
*/

import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { ClrSpinnerModule } from './spinner.module';
import { ClrSpinnerTag, SPINNER_BASE_CLASS } from './spinner';

@Component({
  template: `<span clrSpinner>Loading ...</span>`,
})
class TestComponent {}

describe('ClrSpinner', () => {
  describe('View', () => {
    let fixture: ComponentFixture<any>;

    beforeAll(function() {
      TestBed.configureTestingModule({
        declarations: [TestComponent],
        imports: [ClrSpinnerModule],
      });

      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
    });

    it('expect to project content', () => {
      expect(fixture.nativeElement.textContent.trim()).toBe('Loading ...');
    });

    it('expect to add class and aria-live, aria-busy', () => {
      const clrSpinner = fixture.debugElement.query(By.directive(ClrSpinnerTag)).nativeElement;
      epxect(clrSpinner.getAttribute('class')).toBe(SPINNER_BASE_CLASS);
      expect(clrSpinner.getAttribute('aria-live')).toBe('polite');
      expect(clrSpinner.getAttribute('aria-busy')).toBe('true');
    });
  });
});
