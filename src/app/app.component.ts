import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PostApiService } from './services/post-api.service';
import {MatDialog, MatDialogConfig} from "@angular/material/dialog";
import { DialogComponent } from './components/dialog/dialog.component'; 

// import { ArticleService } from './article.service';

@Component({
  selector: 'app-root',

  templateUrl: './app.component.html',

  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'v2-countriesTable';
  faSearch=faSearch;
  countries!: MatTableDataSource<any>;
  // local!:Array<any>;
  local:Array<any>=[];

  columns=["Save to LS","name","cca3","capital","population","Borders"];

  key: string = 'localCountries';
  check!:any;
  @ViewChild(MatPaginator) paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  constructor(private service: PostApiService , private dialog: MatDialog) {}

  ngOnInit() {
    this.service
      .getPosts()

      .subscribe((response:any) => {
        response = response.map((country:any) => ({
          name: country.name.common,
          capital: country.capital ? country.capital : "",
          cca3: country.cca3,
          population: country.population,
          borders: country.borders ? country.borders : [],
        }));
        
        this.countries = new MatTableDataSource(response);
        this.countries.paginator = this.paginator;
        this.countries.sort = this.sort;
      });
  }

  // filter data with timeout for input from user
  filterData($event :any){
    setTimeout(() => {
      this.countries.filter=$event.target.value;
    }, 3000);
  }

  //show dialog
  openDialog(bor:any) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    dialogConfig.data=bor;
    
    this.dialog.open(DialogComponent, dialogConfig);
}
saveToLocal(element:any,event:any){
  if (event.checked) {
    this.local.push(element);
  } else {
    //try make new delete function whrn finished
    this.local.pop();

  }
  localStorage.setItem("countries", JSON.stringify(this.local));
}

}
