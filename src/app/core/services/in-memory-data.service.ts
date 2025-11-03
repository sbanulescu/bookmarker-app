import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Bookmark } from '../models/bookmark.model';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const iso = (msOffset: number) => new Date(Date.now() + msOffset).toISOString();

    const bookmarks: Bookmark[] = [
      {
        id: 1,
        title: 'Angular Documentation',
        url: 'https://angular.io/docs',
        createdAt: iso(-2 * 60 * 60 * 1000),
        updatedAt: iso(-2 * 60 * 60 * 1000),
      },
      {
        id: 2,
        title: 'RxJS Guide',
        url: 'https://rxjs.dev/guide/overview',
        createdAt: iso(-4 * 60 * 60 * 1000),
        updatedAt: iso(-4 * 60 * 60 * 1000),
      },
      {
        id: 3,
        title: 'TypeScript Handbook',
        url: 'https://www.typescriptlang.org/docs/handbook/intro.html',
        createdAt: iso(-30 * 60 * 1000),
        updatedAt: iso(-30 * 60 * 1000),
      },
      {
        id: 4,
        title: 'NgRx Store',
        url: 'https://ngrx.io/guide/store',
        createdAt: iso(-24 * 60 * 60 * 1000 - 60 * 60 * 1000),
        updatedAt: iso(-24 * 60 * 60 * 1000 - 60 * 60 * 1000),
      },
      {
        id: 5,
        title: 'Angular CLI',
        url: 'https://angular.dev/tools/cli',
        createdAt: iso(-24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
        updatedAt: iso(-24 * 60 * 60 * 1000 - 6 * 60 * 60 * 1000),
      },
      {
        id: 6,
        title: 'Angular Router',
        url: 'https://angular.dev/guide/routing',
        createdAt: iso(-24 * 60 * 60 * 1000 - 10 * 60 * 60 * 1000),
        updatedAt: iso(-24 * 60 * 60 * 1000 - 10 * 60 * 60 * 1000),
      },
      {
        id: 7,
        title: 'Angular Material',
        url: 'https://material.angular.io/',
        createdAt: iso(-3 * 24 * 60 * 60 * 1000),
        updatedAt: iso(-3 * 24 * 60 * 60 * 1000),
      },
      {
        id: 8,
        title: 'RxJS Operators',
        url: 'https://rxjs.dev/guide/operators',
        createdAt: iso(-7 * 24 * 60 * 60 * 1000),
        updatedAt: iso(-7 * 24 * 60 * 60 * 1000),
      },
      {
        id: 9,
        title: 'TypeScript Utility Types',
        url: 'https://www.typescriptlang.org/docs/handbook/utility-types.html',
        createdAt: iso(-30 * 24 * 60 * 60 * 1000),
        updatedAt: iso(-30 * 24 * 60 * 60 * 1000),
      },
    ];
    return { bookmarks };
  }
}
