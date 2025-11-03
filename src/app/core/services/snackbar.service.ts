import { Injectable, inject } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({ providedIn: 'root' })
export class SnackbarService {
  private readonly snackBar = inject(MatSnackBar);

  showSuccess(message: string, action: string = 'Close', config: MatSnackBarConfig = {}): void {
    this.snackBar.open(message, action, {
      panelClass: ['snackbar-success'],
      ...config,
    });
  }
  showError(message: string, action: string = 'Close', config: MatSnackBarConfig = {}): void {
    this.snackBar.open(message, action, {
      panelClass: ['snackbar-error'],
      ...config,
    });
  }
}
