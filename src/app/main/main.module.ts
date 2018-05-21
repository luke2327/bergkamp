import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainComponent } from './main.component';
import { RouterModule } from '@angular/router';
import { AppsyncService } from '../aws-appsync/service/appsync.service';
import { AllSnapshotService } from '../aws-appsync/service/all-snapshot.service';
import { History1hService } from '../aws-appsync/service/history-1h.service';
import { History1mService } from '../aws-appsync/service/history-1m.service';

@NgModule({
  imports: [
    CommonModule,
    RouterModule
  ],
  providers: [
    AppsyncService,
    AllSnapshotService,
    History1hService,
    History1mService
  ],
  declarations: [MainComponent]
})
export class MainModule { }
