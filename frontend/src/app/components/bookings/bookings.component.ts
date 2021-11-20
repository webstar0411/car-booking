import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {BookingsDataSourceService} from '../../services/bookings-data-source.service';
import {MatPaginator, PageEvent} from '@angular/material/paginator';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort, Sort, SortDirection} from '@angular/material/sort';
import {BehaviorSubject, fromEvent, merge} from 'rxjs';
import {debounceTime, distinctUntilChanged} from 'rxjs/operators';
import {TableOptions} from '../../models/table-options';

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


  readonly tableOptions: TableOptions = {
    filter: new BehaviorSubject(''),
    page: new BehaviorSubject({pageIndex: 0, pageSize: 2, previousPageIndex: 0} as PageEvent),
    sort: new BehaviorSubject({active: 'id', direction: 'asc'} as Sort)
  };
  readonly totalItems$: BehaviorSubject<number>;

  constructor(private activatedRoute: ActivatedRoute,
              private router: Router,
              private bookingsDataSourceService: BookingsDataSourceService) {
    this.dataSource = bookingsDataSourceService;
    this.totalItems$ = bookingsDataSourceService.totalCount$;
  }

  get displayedColumns(): string[] {
    const cols = COL_DEF.map(i => i.id);
    cols.push('locality');
    cols.push('actions');
    return cols;
  }

  ngOnInit(): void {
    this.totalItems$.next(this.activatedRoute.snapshot.data.totalBookings);
    this.dataSource.load(this.tableOptions);
  }


  ngAfterViewInit(): void {

    // search debounce
    const search$ = fromEvent(this.search.nativeElement, 'keyup')
      .pipe(debounceTime(200), distinctUntilChanged());

    // reset page sort
    merge(search$, this.sort.sortChange)
      .subscribe((d) => this.paginator.pageIndex = 0);

    // @ts-ignore
    search$.subscribe(_ => this.tableOptions.filter.next(this.search.nativeElement.value));
    this.sort.sortChange.subscribe(sort => this.tableOptions.sort.next(sort));
    this.paginator.page.subscribe(page => this.tableOptions.page.next(page));

  }

  edit(id: string): void {
    this.router.navigate(['/bookings', id, 'edit']);
  }


}


