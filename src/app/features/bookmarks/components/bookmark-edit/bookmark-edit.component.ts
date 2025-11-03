import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Bookmark } from '../../../../core/models/bookmark.model';
import { BookmarkActions } from '../../store/bookmarks.actions';
import { BookmarkState } from '../../store/bookmarks.reducer';
import { Actions, ofType } from '@ngrx/effects';
import { Subject, takeUntil, first } from 'rxjs';

@Component({
  standalone: false,
  selector: 'app-bookmark-edit',
  templateUrl: './bookmark-edit.component.html',
  styleUrls: ['./bookmark-edit.component.scss'],
})
export class BookmarkEditComponent implements OnInit, OnDestroy {
  bookmarkId!: number;
  selectedBookmark?: Partial<Bookmark>;
  private destroy$ = new Subject<void>();

  constructor(
    private store: Store<{ bookmarks: BookmarkState }>,
    private route: ActivatedRoute,
    private router: Router,
    private actions$: Actions
  ) {}

  ngOnInit(): void {
    this.bookmarkId = Number(this.route.snapshot.paramMap.get('id'));
    this.store
      .select((state) => state.bookmarks.entities[this.bookmarkId])
      .subscribe((bookmark) => {
        if (bookmark) {
          this.selectedBookmark = { ...bookmark };
        }
      });
  }

  onSave(changes: Partial<Bookmark>) {
    this.store.dispatch(BookmarkActions.updateBookmark({ id: this.bookmarkId, changes }));
    this.router.navigate(['/']);
  }

  onCancel() {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
