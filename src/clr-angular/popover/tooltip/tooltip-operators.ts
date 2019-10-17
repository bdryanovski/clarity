/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 *
 */

import { ClrPopoverStringMap } from '../../utils/popover/interfaces/popover-strings-map.interface';
import { ClrPopoverPosition } from '../../utils/popover/interfaces/popover-position.interface';

import { ClrAxis } from '../../utils/popover/enums/axis.enum';
import { ClrSide } from '../../utils/popover/enums/side.enum';
import { ClrAlignment } from '../../utils/popover/enums/alignment.enum';

import {
  findPositionObject as _findPositionObject,
  findPositionString as _findPositionString,
  validPosition as _validPosition
} from '../../utils/popover/position-operators';

export const TOOLTIP_SMART_POSITIONS_MAP: ClrPopoverStringMap = {
  'top-left': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  },
  'top-middle': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
  'top-right': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.START,
  },
  'bottom-right': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.START,
  },
  'bottom-middle': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
  'bottom-left': {
    axis: ClrAxis.VERTICAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.END,
  },
  'right': {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.AFTER,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
  'left': {
    axis: ClrAxis.HORIZONTAL,
    side: ClrSide.BEFORE,
    anchor: ClrAlignment.CENTER,
    content: ClrAlignment.CENTER,
  },
};

export function posibleStringPositions(position: string): boolean {
  return Object.keys(TOOLTIP_SMART_POSITIONS_MAP).includes(position);
}

export function findPositionObject(position: string): ClrPopoverPosition {
  return _findPositionObject(position, TOOLTIP_SMART_POSITIONS_MAP);
}

export function validPosition(position: string): boolean {
  return _validPosition(position, TOOLTIP_SMART_POSITIONS_MAP);
}

export function findPositionString(position: ClrPopoverPosition): string {
  return _findPositionString(position, TOOLTIP_SMART_POSITIONS_MAP);
}