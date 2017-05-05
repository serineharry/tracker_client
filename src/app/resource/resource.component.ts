import { Component, OnInit, OnChanges, SimpleChange, Input, EventEmitter, Output } from '@angular/core';
import { ResourceService } from './resource.service';
import { Schedule } from '../model/schedule';
import { Resource } from '../model/resource';
import * as moment from 'moment/moment';
import { GlobalConfig } from '../global-config';
import { GlobalService } from '../global.service';

@Component({
  selector: 'app-resource',
  templateUrl: './resource.component.html',
  styleUrls: ['./resource.component.css'],
  providers: [ResourceService]
})
export class ResourceComponent implements OnInit, OnChanges {

  @Input()
  schedule: Schedule = new Schedule();

  @Output()
  resourceSelect: EventEmitter<Resource> = new EventEmitter<Resource>();


  resources: Resource[] = [];
  constructor(private resSvc: ResourceService, private globalSvc: GlobalService) { }

  ngOnInit() {

    this.getResourcesWithAvailablity();
  }

  ngOnChanges(changes: { [propKey: string]: SimpleChange }) {

    let simpleChange = changes['schedule'];
    if (simpleChange.currentValue !== simpleChange.previousValue) {
      this.getResourcesWithAvailablity();
    }

  }

  getResourcesWithAvailablity() {

    this.schedule.applicationId = this.globalSvc.getApplication().applicationId;

    this.resSvc.getResourcesWithAvailablity(this.schedule)
      .subscribe(
      resources => {
        this.resources = resources;
      },
      err => {
        console.log('Resource fetch error', err);
      }
      );
  }

  resourceSelected(selectedResource: Resource) {

    console.log('Resource: resourceSelected', selectedResource);
    this.resourceSelect.emit(selectedResource);
  }


}
