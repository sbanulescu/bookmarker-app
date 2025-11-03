import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { BookmarkActions } from './bookmarks.actions';
import { BookmarkService } from '../bookmark.service';
import { SnackbarService } from '../../../core/services/snackbar.service';

@Injectable()
export class BookmarkEffects {
  private readonly actions$ = inject(Actions);
  private readonly bookmarkService = inject(BookmarkService);
  private readonly snackbar = inject(SnackbarService);

  loadBookmarks$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.loadBookmarks),
      mergeMap(() =>
        this.bookmarkService.getBookmarks().pipe(
          map(bookmarks => BookmarkActions.loadBookmarksSuccess({ bookmarks })),
          catchError(error =>
            of(BookmarkActions.loadBookmarksFailure({ error: error.message }))
          )
        )
      )
    )
  );
  createBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.createBookmark),
      mergeMap(({ bookmark }) =>
        this.bookmarkService.createBookmark(bookmark).pipe(
          map(bookmark => BookmarkActions.createBookmarkSuccess({ bookmark })),
          catchError(error =>
            of(BookmarkActions.createBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );

  createBookmarkSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.createBookmarkSuccess),
        tap(() => {
          this.snackbar.showSuccess('Bookmark created successfully!');
        })
      ),
    { dispatch: false }
  );

  createBookmarkFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.createBookmarkFailure),
        tap(({ error }) => {
          this.snackbar.showError(`Failed to create bookmark: ${error}`);
        })
      ),
    { dispatch: false }
  );

  updateBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.updateBookmark),
      mergeMap(({ id, changes }) =>
        this.bookmarkService.updateBookmark(id, changes).pipe(
          map((bookmark) => BookmarkActions.updateBookmarkSuccess({ bookmark })),
          catchError((error) =>
            of(BookmarkActions.updateBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );

  updateBookmarkSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.updateBookmarkSuccess),
        tap(() => {
          this.snackbar.showSuccess('Bookmark updated successfully!');
        })
      ),
    { dispatch: false }
  );

  updateBookmarkFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.updateBookmarkFailure),
        tap(({ error }) => {
          this.snackbar.showError(`Failed to update bookmark: ${error}`);
        })
      ),
    { dispatch: false }
  );

  deleteBookmark$ = createEffect(() =>
    this.actions$.pipe(
      ofType(BookmarkActions.deleteBookmark),
      mergeMap(({ id }) =>
        this.bookmarkService.deleteBookmark(id).pipe(
          map(() => BookmarkActions.deleteBookmarkSuccess({ id })),
          catchError(error =>
            of(BookmarkActions.deleteBookmarkFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteBookmarkSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.deleteBookmarkSuccess),
        tap(() => {
          this.snackbar.showSuccess('Bookmark deleted successfully!');
        })
      ),
    { dispatch: false }
  );

  deleteBookmarkFailure$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(BookmarkActions.deleteBookmarkFailure),
        tap(({ error }) => {
          this.snackbar.showError(`Failed to delete bookmark: ${error}`);
        })
      ),
    { dispatch: false }
  );
}
