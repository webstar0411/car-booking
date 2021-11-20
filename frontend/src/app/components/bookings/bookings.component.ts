import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookingsService} from '../../services/bookings.service';
import {BookingsDataSourceService} from '../../services/bookings-data-source.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute} from '@angular/router';
import {MatSort, SortDirection} from '@angular/material/sort';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {BookingsCountResolver} from '../../services/bookings-count-resolver.service';

interface ColOptions {
  name: string;
  id: string;
}

const COL_DEF: ColOptions[] = [
  {id: 'id', name: 'ID'},
  {id: 'name', name: 'Name'},
  {id: 'phone', name: 'Phone N.'},
  {id: 'price', name: 'Price'},
  {id: 'rating', name: 'Rating'},
  {id: 'pickup_time', name: 'Pickup'},
  {id: 'waiting_time', name: 'Waiting(min)'},
  {id: 'waypoint?.locality', name: 'Location'},
];

const TABLE_DEFAULT_OPTIONS = {
  PAGE_SIZE: 2,
  PAGE_SIZE_OPTIONS: [2, 5, 10],
  SORT_ORDER: 'asc' as SortDirection,
  FILTER: '',
  DEFAULT_SORT_FIELD: 'name'
};


@Component({
  selector: 'cars-bookings',
  templateUrl: './bookings.component.html',
  styleUrls: ['./bookings.component.scss'],
  providers: [BookingsDataSourceService]
})
export class BookingsComponent implements OnInit, AfterViewInit {
  defaultOptions = TABLE_DEFAULT_OPTIONS;
  dataSource: BookingsDataSourceService;
  colDef = COL_DEF;
  displayedColumns = COL_DEF.map(i => i.id);
  totalItems = 0;

  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild('input', {static: true}) search!: ElementRef;

  constructor(private route: ActivatedRoute, private bookingsDataSourceService: BookingsDataSourceService) {
    this.dataSource = bookingsDataSourceService;
  }

  ngOnInit(): void {
    this.totalItems = this.route.snapshot.data.totalBookings;
    this.dataSource.load(this.defaultOptions.FILTER,
      this.defaultOptions.SORT_ORDER,
      0,
      this.defaultOptions.PAGE_SIZE);
  }


  onRowClick(row: any): void {
    console.log('Row clicked: ', row);
  }

  ngAfterViewInit(): void {

    // search debounce
    const search$ = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged());

    // reset page sort
    merge(search$, this.sort.sortChange)
      .subscribe(() => this.paginator.pageIndex = 0);

    // fetch data
    merge(search$, this.sort.sortChange, this.paginator.page)
      .subscribe(_ => this.loadPage());
  }

  private loadPage(): void {
    this.dataSource.load(
      this.search.nativeElement.value,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }
}

