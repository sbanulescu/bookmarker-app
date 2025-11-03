import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { BookmarkActions } from '../../store/bookmarks.actions';
import { BookmarkState } from '../../store/bookmarks.reducer';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { Bookmark } from '../../../../core/models/bookmark.model';
import { selectAllBookmarks, selectBookmarksLoading } from '../../store/bookmarks.selectors';
import { BookmarkService } from '../../bookmark.service';
// removed SEARCH_DEBOUNCE_MS constant usage

export interface GroupedBookmarks {
  today: Bookmark[];
  yesterday: Bookmark[];
  older: Bookmark[];
}

export interface BookmarkSection {
  title: string;
  bookmarks: Bookmark[];
}

@Component({
  standalone: false,
  selector: 'app-bookmark-list',
  templateUrl: './bookmark-list.component.html',
  styleUrls: ['./bookmark-list.component.scss'],
})
export class BookmarkListComponent implements OnInit {
  bookmarkSections$!: Observable<BookmarkSection[]>;
  searchResults$!: Observable<Bookmark[]>;
  isSearching$!: Observable<boolean>;
  searchQuery$!: Observable<string>;
  loading$!: Observable<boolean>;

  constructor(
    private bookmarkService: BookmarkService,
    private store: Store<{ bookmarks: BookmarkState }>
  ) {}

  ngOnInit(): void {
    this.store.dispatch(BookmarkActions.loadBookmarks());
    this.loading$ = this.store.select(selectBookmarksLoading);

    const bookmarks$ = this.store.select(selectAllBookmarks);
    this.searchQuery$ = this.bookmarkService.searchQuery$;

    this.isSearching$ = this.searchQuery$.pipe(map((query) => query.trim().length > 0));

    this.searchResults$ = combineLatest([bookmarks$, this.searchQuery$]).pipe(
      map(([bookmarks, query]) => {
        if (!query.trim()) {
          return [];
        }
        return bookmarks.filter(
          (bookmark) =>
            bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
            bookmark.url.toLowerCase().includes(query.toLowerCase())
        );
      })
    );

    this.bookmarkSections$ = combineLatest([bookmarks$, this.searchQuery$]).pipe(
      map(([bookmarks, query]) => {
        if (query.trim()) return [];
        const grouped = this.groupBookmarks(bookmarks);
        return [
          { title: 'Today', bookmarks: grouped.today },
          { title: 'Yesterday', bookmarks: grouped.yesterday },
          { title: 'Older', bookmarks: grouped.older },
        ].filter((section) => section.bookmarks.length > 0);
      })
    );
  }

  groupBookmarks(bookmarks: Bookmark[]): GroupedBookmarks {
    const today: Bookmark[] = [];
    const yesterday: Bookmark[] = [];
    const older: Bookmark[] = [];
    const now = new Date();
    const todayStart = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);
    bookmarks.forEach((bookmark) => {
      if (!bookmark.createdAt) {
        older.push(bookmark);
        return;
      }
      const date = new Date(bookmark.createdAt);
      if (date >= todayStart) {
        today.push(bookmark);
      } else if (date >= yesterdayStart) {
        yesterday.push(bookmark);
      } else {
        older.push(bookmark);
      }
    });
    return { today, yesterday, older };
  }

  deleteBookmark(id: number): void {
    this.store.dispatch(BookmarkActions.deleteBookmark({ id }));
  }
}
