import {BehaviorSubject} from 'rxjs';
import {Sort} from '@angular/material/sort';
import {PageEvent} from '@angular/material/paginator';

export interface TableOptions {
  filter: BehaviorSubject<string>;
  sort: BehaviorSubject<Sort>;
  page: BehaviorSubject<PageEvent>;
}
