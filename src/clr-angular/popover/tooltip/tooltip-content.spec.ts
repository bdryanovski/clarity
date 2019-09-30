/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component } from '@angular/core';

import { IfOpenService } from '../../utils/conditional/if-open.service';
import { Point } from '../common/popover';

import { ClrTooltipContent } from './tooltip-content';
import { spec, TestContext } from '../../utils/testing/helpers.spec';
import { ClrTooltipModule } from './tooltip.module';
import { UNIQUE_ID_PROVIDER } from '../../utils/id-generator/id-generator.service';
import { TooltipIdService } from './providers/tooltip-id.service';

import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAxis } from '../../utils/popover/enums/axis.enum';

import { ClrPopoverToggleService } from '../../utils/popover/providers/popover-toggle.service';
import { ClrPopoverEventsService } from '../../utils/popover/providers/popover-events.service';
import { ClrPopoverPositionService } from '../../utils/popover/providers/popover-position.service';

const COMPONENT_PROVIDERS = [
  ClrPopoverToggleService,
  ClrPopoverEventsService,
  ClrPopoverPositionService,
  IfOpenService,
  UNIQUE_ID_PROVIDER,
  TooltipIdService,
];

@Component({
  template: `
    <clr-tooltip>
        <clr-tooltip-content [clrPosition]="position" [clrSize]="size" >
          Hello world
        </clr-tooltip-content>
    </clr-tooltip>
  `,
})
class SimpleTest {
  position: string;
  size: string;
  idValue;
  idTest = false;
}

@Component({
  template: `
    <clr-tooltip>
      <clr-tooltip-content [id]="idValue">
        Hello world
      </clr-tooltip-content>
    </clr-tooltip>
  `,
})
class IdTest {
  idValue;
}

interface TooltipContext extends TestContext<ClrTooltipContent, SimpleTest> {
  ifOpenService: IfOpenService;
  tooltipIdService: TooltipIdService;
}

export default function(): void {
  fdescribe('TooltipContent component', function() {
    describe('TypeScript API', function() {});

    describe('Template API', function(this: TooltipContext) {
      describe('handles values for custom id', function() {
        spec(ClrTooltipContent, IdTest, ClrTooltipModule, {
          providers: COMPONENT_PROVIDERS,
        });

        beforeEach(function(this: TooltipContext) {
          this.getClarityProvider(IfOpenService).open = true;
          this.tooltipIdService = this.getClarityProvider(TooltipIdService);
          this.detectChanges();
        });

        it('accepts an [id] when an undefined id is provided', function() {
          // IdTest component starts with idValue undefined
          console.log(this.clarityElement);
          expect(this.clarityElement.getAttribute('id')).toEqual('');
        });

        it('accepts an [id] when a null id is provided', function() {
          this.hostComponent.idValue = null;
          this.detectChanges();
          expect(this.clarityElement.getAttribute('id')).toEqual('');
        });

        it('accepts an [id] when an empty string id is provided', function() {
          this.hostComponent.idValue = '';
          this.detectChanges();
          expect(this.clarityElement.getAttribute('id')).toEqual('');
        });

        it('accepts an [id] when an custom string id is provided', function() {
          this.hostComponent.idValue = 'custom-id';
          this.detectChanges();
          expect(this.clarityElement.getAttribute('id')).toEqual('custom-id');
        });
      });

      fdescribe('handles inputs for position and size', function() {
        spec(ClrTooltipContent, SimpleTest, ClrTooltipModule, {
          providers: COMPONENT_PROVIDERS,
        });

        beforeEach(function(this: TooltipContext) {
          this.getClarityProvider(IfOpenService).open = true;
          this.getClarityProvider(ClrPopoverToggleService).open = true;
          this.tooltipIdService = this.getClarityProvider(TooltipIdService);
          this.detectChanges();
        });

        it('sets an id when no id is provided', function() {
          expect(this.clarityDirective.id).toEqual(this.clarityElement.getAttribute('id'));
        });

        fit('accepts a [clrPosition] input', function(this: TooltipContext) {
          console.log((<any>this.clarityDirective).smartToggleService.open);
          console.log(this.clarityElement);

          // Default is right
          expect((<any>this.clarityDirective).smartPosition).toEqual({
            axis: ClrAxis.HORIZONTAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.CENTER,
            content: ClrAlignment.END,
          });
          //expect(this.clarityElement.classList).toContain('tooltip-right');

          this.hostComponent.position = 'bottom-right';
          this.detectChanges();
          expect((<any>this.clarityDirective).smartPosition).toEqual({
            axis: ClrAxis.HORIZONTAL,
            side: ClrSide.AFTER,
            anchor: ClrAlignment.END,
            content: ClrAlignment.END,
          });
          //expect(this.clarityElement.classList).not.toContain('tooltip-right');
          //expect(this.clarityElement.classList).toContain('tooltip-bottom-right');

          this.hostComponent.position = 'top-left';
          this.detectChanges();
          expect((<any>this.clarityDirective).smartPosition).toEqual({
            axis: ClrAxis.VERTICAL,
            side: ClrSide.BEFORE,
            anchor: ClrAlignment.CENTER,
            content: ClrAlignment.END,
          });

          //expect(this.clarityElement.classList).not.toContain('tooltip-bottom-right');
          //expect(this.clarityElement.classList).toContain('tooltip-top-left');
        });

        it('accepts a [clrSize] input', function(this: TooltipContext) {
          // Default is small
          expect(this.clarityDirective.size).toEqual('sm');
          expect(this.clarityElement.classList).toContain('tooltip-sm');

          this.hostComponent.size = 'lg';
          this.detectChanges();
          expect(this.clarityDirective.size).toEqual('lg');
          expect(this.clarityElement.classList).not.toContain('tooltip-sm');
          expect(this.clarityElement.classList).toContain('tooltip-lg');
        });
      });
    });

    describe('View basics', function() {
      spec(ClrTooltipContent, SimpleTest, ClrTooltipModule, {
        providers: COMPONENT_PROVIDERS,
      });

      beforeEach(function(this: TooltipContext) {
        this.getClarityProvider(IfOpenService).open = true;
        this.tooltipIdService = this.getClarityProvider(TooltipIdService);
        this.detectChanges();
      });

      it('projects content', function(this: TooltipContext) {
        expect(this.clarityElement.textContent.trim()).toMatch('Hello world');
      });

      it('adds the .tooltip-content class to the host', function(this: TooltipContext) {
        expect(this.clarityElement.classList).toContain('tooltip-content');
      });

      it('has the correct role', function() {
        expect(this.clarityElement.getAttribute('role')).toBe('tooltip');
      });

      it('has an id', function() {
        expect(this.clarityElement.getAttribute('id')).toBeTruthy();
      });
    });
  });
}
