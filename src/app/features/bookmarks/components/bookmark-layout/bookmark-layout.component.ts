import { Component, OnInit, ViewEncapsulation, OnDestroy } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { BookmarkService } from '../../bookmark.service';
import { filter, takeUntil, Subject } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-bookmark-layout',
  templateUrl: './bookmark-layout.component.html',
  styleUrls: ['./bookmark-layout.component.scss'],
  host: { class: 'bookmark-layout' },
  encapsulation: ViewEncapsulation.None,
})
export class BookmarkLayoutComponent implements OnInit, OnDestroy {
  searchQuery = '';
  showSearch = false;
  private destroy$ = new Subject<void>();

  constructor(
    private bookmarkService: BookmarkService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.router.events
      .pipe(
        filter((event) => event instanceof NavigationEnd),
        takeUntil(this.destroy$)
      )
      .subscribe((event: NavigationEnd) => {
        this.showSearch = event.urlAfterRedirects === '/' || event.urlAfterRedirects === '';
        if (!this.showSearch) {
          this.searchQuery = '';
          this.bookmarkService.setSearchQuery('');
        }
      });
    this.showSearch = this.router.url === '/' || this.router.url === '';
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSearch(query: string): void {
    this.bookmarkService.setSearchQuery(query);
  }
}
