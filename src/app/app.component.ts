import { Component, OnInit, AfterViewInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PostApiService } from './services/post-api.service';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
} from '@angular/material/dialog';
import { DialogComponent } from './components/dialog/dialog.component';
import { AddDialogComponent } from './components/add-dialog/add-dialog.component';
import { catchError } from 'rxjs/operators';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'v2-countriesTable';
  faSearch = faSearch;
  countries!: MatTableDataSource<any>;
  local: Array<any> = [];

  columns = ['Save to LS', 'name', 'cca3', 'capital', 'population', 'Borders'];

  key: string = 'localCountries';
  check!: any;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private service: PostApiService, private dialog: MatDialog) {}

  ngOnInit() {
    this.service
      .getPosts()
      .pipe(catchError(this.handleError()))
      .subscribe((response: any) => {
        response = response.map((country: any) => ({
          name: country.name.common,
          capital: country.capital ? country.capital : '',
          cca3: country.cca3,
          population: country.population,
          borders: country.borders ? country.borders : [],
        }));

        this.countries = new MatTableDataSource(response);
        this.countries.paginator = this.paginator;
        this.countries.sort = this.sort;
      });
  }
  handleError(): any {
    let response = JSON.parse(localStorage.getItem('countries'));
    this.countries = new MatTableDataSource(response);
  }
  ngAfterViewInit() {
    this.countries.paginator = this.paginator;
    this.countries.sort = this.sort;
  }

  // filter data with timeout for input from user
  filterData($event: any) {
    setTimeout(() => {
      this.countries.filter = $event.target.value;
    }, 3000);
  }

  //show dialog
  openDialog(bor: any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data = bor;

    this.dialog.open(DialogComponent, dialogConfig);
  }
  saveToLocal(element: any, event: any) {
    if (event.checked) {
      this.local.push(element);
    } else {
      const index = this.local.indexOf(element);
      if (index !== -1) {
        this.local.splice(index, 1);
      }
    }
    localStorage.setItem('countries', JSON.stringify(this.local));
  }

  //add form
  add() {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    this.dialog
      .open(AddDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe((response) => {
        if (response == true) {
        } else {
          this.countries.data.push(response.data);
          console.log(response.data);

          this.countries._updateChangeSubscription();
        }
      });
  }
}
