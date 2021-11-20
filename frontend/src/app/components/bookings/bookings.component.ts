import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookingsDataSourceService} from '../../services/bookings-data-source.service';
import {MatPaginator} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, SortDirection} from '@angular/material/sort';
import {fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {BookingsService} from '../../services/bookings.service';
import {Booking} from '../../models/booking';
import {UserMsgService} from '../../services/user-msg.service';

interface ColOptions {
  isDateTime: boolean;
  name: string;
  id: string;
}

const COL_DEF: ColOptions[] = [
  {id: 'name', name: 'Name', isDateTime: false},
  {id: 'phone', name: 'Phone', isDateTime: false},
  {id: 'price', name: 'Price', isDateTime: false},
  {id: 'rating', name: 'Rating', isDateTime: false},
  {id: 'pickup_time', name: 'Pickup', isDateTime: true},
  {id: 'waiting_time', name: 'Waiting', isDateTime: false},
];

const TABLE_DEFAULT_OPTIONS = {
  PAGE_SIZE: 2,
  PAGE_SIZE_OPTIONS: [2, 5, 10],
  SORT_FIELD: 'id',
  SORT_ORDER: 'asc' as SortDirection,
  FILTER: ''
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
  totalItems = 0;


  // @ts-ignore
  @ViewChild(MatPaginator) paginator: MatPaginator;
  // @ts-ignore
  @ViewChild(MatSort) sort: MatSort;
  // @ts-ignore
  @ViewChild('input', {static: true}) search!: ElementRef;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookingsDataSourceService: BookingsDataSourceService,
              private bookingsService: BookingsService,
              private userMsgService: UserMsgService) {
    this.dataSource = bookingsDataSourceService;
  }

  get displayedColumns(): string[] {
    const cols = COL_DEF.map(i => i.id);
    cols.push('locality');
    cols.push('actions');
    return cols;
  }

  ngOnInit(): void {
    this.totalItems = this.activatedRoute.snapshot.data.totalBookings;
    this.dataSource.load(this.defaultOptions.FILTER,
      this.defaultOptions.SORT_FIELD,
      this.defaultOptions.SORT_ORDER,
      0,
      this.defaultOptions.PAGE_SIZE);
  }


  ngAfterViewInit(): void {

    // search debounce
    const search$ = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged());

    // reset page sort
    merge(search$, this.sort.sortChange)
      .subscribe((d) => this.paginator.pageIndex = 0);

    // fetch data
    merge(search$, this.sort.sortChange, this.paginator.page)
      .subscribe(_ => this.loadPage());
  }


  private loadPage(): void {
    this.dataSource.load(
      this.search.nativeElement.value,
      this.sort.active,
      this.sort.direction,
      this.paginator.pageIndex,
      this.paginator.pageSize);
  }

  edit(id: string): void {
    this.router.navigate(['/bookings', id, 'edit']);
  }

  clone(booking: Booking): void {
    this.bookingsService.clone(booking).subscribe(
      res => {
        this.userMsgService.ok('Booking cloned, your data table is outdated.');
      },
      err => this.userMsgService.error('Fail to clone Booking'),
      () => console.log('HTTP request completed.')
    );
  }

  delete(booking: Booking): void {
    this.bookingsService.delete(booking).subscribe(
      res => {
        this.userMsgService.ok('Booking deleted, your datatable is outdated.');
      },
      err => this.userMsgService.error('Fail to delete Booking'),
      () => console.log('HTTP request completed.')
    );
  }
}


