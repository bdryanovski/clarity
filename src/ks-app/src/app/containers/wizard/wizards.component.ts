/*
 * Copyright (c) 2016-2019 VMware, Inc. All Rights Reserved.
 * This software is released under MIT license.
 * The full license information can be found in LICENSE in the root directory of this project.
 */

import { Component, ViewChild } from '@angular/core';
import {
  ClrWizard,
  ClrWizardButton,
  ClrWizardCustomTags,
  ClrWizardHeaderAction,
  ClrWizardPageButtons,
  ClrWizardPageHeaderActions,
  ClrWizardPageNavTitle,
  ClrWizardPageTitle,
  ClrWizardStepnav,
} from '@clr/angular';

@Component({ templateUrl: './wizards.component.html' })
export class KSWizards {
  /**
   * @description
   * These exist so that the exported API from Clarity is tested when ks-app is compiled with --prod.
   */
  private aClrWizardStepnav: ClrWizardStepnav;
  private aClrWizardButton: ClrWizardButton;
  private aClrWizardHeaderAction: ClrWizardHeaderAction;
  private aClrWizardCustomTags: ClrWizardCustomTags;
  private aClrWizardPageTitle: ClrWizardPageTitle;
  private aClrWizardPageNavTitle: ClrWizardPageNavTitle;
  private aClrWizardPageButtons: ClrWizardPageButtons;
  private aClrWizardPageHeaderActions: ClrWizardPageHeaderActions;

  // Async Form Wizard Demo
  @ViewChild('asyncFormWizard', { static: true })
  asyncFormWizard: ClrWizard;

  @ViewChild('myForm', { static: true })
  formData: any;

  loadingFlag: boolean = false;
  errorFlag: boolean = false;
  answer: number = null;
  open: boolean = false;

  doCancel(): void {
    this.asyncFormWizard.close();
    this.onFinish();
  }

  onCommit(): void {
    const value: any = this.formData.value;
    this.loadingFlag = true;
    this.errorFlag = false;

    setTimeout(() => {
      if (value.answer === '42') {
        this.asyncFormWizard.forceNext();
      } else {
        this.errorFlag = true;
      }
      this.loadingFlag = false;
    }, 1000);
  }

  onFinish() {
    this.formData.reset();
    this.asyncFormWizard.reset();
  }

  // Form Wizard Demo
  @ViewChild('formWizard', { static: false })
  formWizard: ClrWizard;
  formOpen: boolean = false;
  formModel = { name: '', favorite: '', number: '' };

  // inlineWizard demo
  @ViewChild('inlineWizard', { static: false })
  inlineWizard: ClrWizard;
  inlineOpen: boolean = false;
}
