import { Component, OnInit, ViewChild  } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { PostApiService } from './services/post-api.service';



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
  columns=["Save to LS","Name","cca3","Capital","Population","Borders"];
  index=["name","cca3","capital","population"];

  @ViewChild('paginator') paginator!:MatPaginator;
  @ViewChild(MatSort) sort!:MatSort;


  constructor(private service: PostApiService) {}

  ngOnInit() {
    this.service
      .getPosts()

      .subscribe((response:any) => {
        this.countries = new MatTableDataSource(response);
        this.countries.paginator = this.paginator;
        this.countries.sort = this.sort;
      });
  }

  filterData($event :any){
    this.countries.filter=$event.target.value;
  }
}
