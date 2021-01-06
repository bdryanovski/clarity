import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { ClarityModule } from '@clr/angular';

import '@clr/icons';

@Component({
  selector: 'app-demo',
  templateUrl: './alert.ng.html',
})
class AlertNgDemo {
  warning = true;
}

@NgModule({
  imports: [BrowserModule, FormsModule, ClarityModule, BrowserAnimationsModule],
  declarations: [AlertNgDemo],
  bootstrap: [AlertNgDemo],
})
export class AppModule {}
