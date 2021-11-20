import {Inject, Injectable} from '@angular/core';
import {CollectionViewer, DataSource} from '@angular/cdk/collections';
import {Booking} from '../models/booking';
import {BehaviorSubject, combineLatest, Observable, of, Subscription} from 'rxjs';
import {BookingsService} from './bookings.service';
import {switchMap, tap} from 'rxjs/operators';
import {BOOKINGS_PAGINATOR} from '../store/bookings-paginator';
import {PaginatorPlugin} from '@datorama/akita';
import {TableOptions} from '../models/table-options';

@Injectable()
export class BookingsDataSourceService implements DataSource<Booking> {
  public readonly loading$ = new BehaviorSubject<boolean>(false);
  readonly totalCount$ = new BehaviorSubject(1);
  private bookings$ = new BehaviorSubject<Booking[]>([]);
  private subscriptions: Subscription[] = [];

  constructor(@Inject(BOOKINGS_PAGINATOR) private paginatorRef: PaginatorPlugin<Booking>,
              private bookingsService: BookingsService) {
  }


  load(options: TableOptions): void {
    this.overwriteAkitaOptions(options);
    this.setDataLoader(options);
  }

  connect(collectionViewer: CollectionViewer): Observable<Booking[] | ReadonlyArray<Booking>> {
    console.log('Connecting data source');
    return this.bookings$.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    console.log('Disconnecting data source');
    this.bookings$.complete();
    this.loading$.complete();
    this.paginatorRef.destroy();
    this.subscriptions.forEach(s => s.unsubscribe());
  }


  private setDataLoader(options: TableOptions): void {
    const subscription = combineLatest([this.paginatorRef.pageChanges, options.filter, options.page, options.sort])
      .pipe(
        switchMap(([pageNumber, filter, page, sort]) => {
            this.paginatorRef.metadata.set('filter', filter);
            this.paginatorRef.metadata.set('sortField', sort.active);
            this.paginatorRef.metadata.set('sortOrder', sort.direction);
            this.paginatorRef.metadata.set('pageNumber', page.pageIndex);
            this.paginatorRef.metadata.set('pageSize', page.pageSize);

            const requestFn = () => this.bookingsService.getBookingsPaginated(this.paginatorRef.metadata)
              // @ts-ignore
              .pipe(tap(data => this.totalCount$.next(data.total)));
            return this.paginatorRef.getPage(requestFn);
          }
        ))
      // @ts-ignore
      .subscribe(page => this.bookings$.next(page.data));
    this.subscriptions.push(subscription);
  }

  private overwriteAkitaOptions(options: TableOptions): void {
    const subscription = combineLatest([options.filter, options.page, options.sort])
      .pipe(
        switchMap(([filter, page, sort]) => {
          this.testClearCacheByField('pageSize', page.pageSize);
          this.testClearCacheByField('sortOrder', sort.direction);
          this.testClearCacheByField('sortField', sort.active);
          this.testClearCacheByField('filter', filter);

          if (page.pageIndex !== page.previousPageIndex) {
            this.paginatorRef.setPage(page.pageIndex);
          }

          return of();
        })).subscribe();
    this.subscriptions.push(subscription);
  }

  private testClearCacheByField(metadataKey: string, currentValue: any): void {
    if (this.paginatorRef.metadata.get(metadataKey) !== currentValue) {
      this.paginatorRef.clearCache();
    }
  }
}
