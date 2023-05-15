import { Component, OnInit, ViewChild } from '@angular/core';
import { AddPasswordComponent } from './add-password/add-password.component';
import { MatDialog } from '@angular/material/dialog';
import { PasswordManagerService } from './services/password-manager.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { CoreService } from './core/core.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  displayedColumns: string[] = [
    'id',
    'category',
    'application',
    'userName',
    'encryptedPassword',
    'update',
    'delete',
  ];
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(
    private _dialog: MatDialog,
    private _passwordManagerService: PasswordManagerService,
    private _coreService: CoreService
  ) {}

  ngOnInit(): void {
    this.getAllPasswordList();
  }

  openAddPassword(){
    const dialogRef = this._dialog.open(AddPasswordComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllPasswordList();
        }
      },
    });
  }

  getAllPasswordList() {
    this._passwordManagerService.getAllPasswords().subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      },
      error: console.log,
    });
  }

  getPasswordById(id: number) {
    this._passwordManagerService.getPasswordById(id).subscribe({
      next: (password: any) => {
        const decryptedPassword = atob(password.encryptedPassword);
        password.decryptedPassword = decryptedPassword;
        this.dataSource = new MatTableDataSource([password]);
      },
      error: (err: any) => {
        console.error(err);
      }
    });
  }
  
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    if (filterValue.trim() === '') {
      this.getAllPasswordList();
      
    // Check if the filter value is a number (ID)
    } else if (!isNaN(Number(filterValue))) {
      const accountId = Number(filterValue);
      this._passwordManagerService.getPasswordById(accountId).subscribe({
        next: (account) => {
          if (account) {
            this.dataSource.data = [account];
          } else {
            this.dataSource.data = [];
            console.log(`Account with ID ${accountId} does not exist.`);
          }
        },
        error: (err) => {
          if (err.status === 404) {
            this.dataSource.data = [];
            console.log(`Account with ID ${accountId} does not exist.`);
          } else {
            console.error(err);
          }
        },
      });
    } else {
      // Filter by other fields if the filter value is not a number
      this.dataSource.filter = filterValue.trim().toLowerCase();
    }
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  deleteAccount(id: number) {
    this._passwordManagerService.deleteAccount(id).subscribe({
      next: (res) => {
        this._coreService.openSnackBar('Employee deleted!', 'done');
        this.getAllPasswordList();
      },
      error: console.log,
    });
  }

  openEditForm(data: any) {
    const dialogRef = this._dialog.open(AddPasswordComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getAllPasswordList();
        }
      },
    });
  }
}
