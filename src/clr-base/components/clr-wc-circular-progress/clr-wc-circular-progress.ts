/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { LitElement, html, css, property } from 'lit-element';

const BACKGROUND_COLOR: string = 'hsl(201, 10%, 90%)';
const PROGRESS_COLOR: string = 'hsl(201, 100%, 36%)';
const DEFAULT_SIZE: number = 36;

function polarToCartesian(centerX: number, centerY: number, radius: number, angleInDegrees: number) {
  const angleInRadians = (angleInDegrees - 90) * Math.PI / 180.0;

  return {
    x: centerX + radius * Math.cos(angleInRadians),
    y: centerY + radius * Math.sin(angleInRadians),
  };
}

function describeArc(x: number, y: number, radius: number, startAngle: number, endAngle: number): string {
  const start = polarToCartesian(x, y, radius, endAngle);
  const end = polarToCartesian(x, y, radius, startAngle);

  const largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';

  const d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y].join(' ');

  return d;
}

export const styles = css`
  :host {
    font-family: inherit;
    font-size: inherit;
    color: inherit;
    display: block;
  }

  span {
    display: block;
    width: 100%;
    height: 100%;
  }
`;

function pctCompleteToRadians(pctComplete: number): number {
  pctComplete = pctComplete / 100;
  return 360 * pctComplete;
}

// @dynamic
export class ClrWcCircularProgress extends LitElement {
  @property({ type: String })
  title = 'progress';

  @property({ type: Number })
  progress = 0;

  @property({ type: String })
  color = PROGRESS_COLOR;

  @property({ type: Number })
  size = DEFAULT_SIZE;

  static get styles() {
    return styles;
  }

  get path(): string {
    return describeArc(18, 18, 16, 0, pctCompleteToRadians(this.progress));
  }

  get backstrokeColor(): string {
    return this.progress > 99 ? this.color : BACKGROUND_COLOR;
  }

  render() {
    return html`
      <span class="clr-circular-progress-container" style="width: ${this.size}px; height: ${this.size}px;">
        <svg version="1.1" viewBox="0 0 36 36" preserveAspectRatio="xMidYMid meet" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" focusable="false" role="img">
            <g stroke="${this.backstrokeColor}" stroke-width="3" fill="none">
                <circle cx="18" cy="18" r="16"/>
            </g>
            <g stroke="${this.color}" stroke-width="3" fill="none" stroke-linecap="round">
                <path d = "${this.path}"/>
            </g>
        </svg>
      </span>
    `;
  }
}

customElements.define('clr-wc-circular-progress', ClrWcCircularProgress);
