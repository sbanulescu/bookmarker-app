import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZonelessChangeDetection,
  isDevMode,
  importProvidersFrom,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { provideStoreDevtools } from '@ngrx/store-devtools';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './core/services/in-memory-data.service';
import { bookmarkReducer } from './features/bookmarks/store/bookmarks.reducer';
import { BookmarkEffects } from './features/bookmarks/store/bookmarks.effects';
import { provideHttpClient } from '@angular/common/http';
import { MAT_SNACK_BAR_DEFAULT_OPTIONS, MatSnackBarConfig } from '@angular/material/snack-bar';
import { SNACKBAR_DURATION } from './shared/constants';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZonelessChangeDetection(),
    provideHttpClient(),
    provideRouter(routes),
    provideStore(),
    provideState({ name: 'bookmarks', reducer: bookmarkReducer }),
    provideEffects([BookmarkEffects]),
    importProvidersFrom(
      HttpClientInMemoryWebApiModule.forRoot(InMemoryDataService, {
        dataEncapsulation: false,
        delay: 300,
      })
    ),
    provideStoreDevtools({ maxAge: 25, logOnly: !isDevMode() }),
    {
      provide: MAT_SNACK_BAR_DEFAULT_OPTIONS,
      useValue: {
        duration: SNACKBAR_DURATION,
        horizontalPosition: 'center',
        verticalPosition: 'top',
      } as MatSnackBarConfig,
    },
  ],
};
