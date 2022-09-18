import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { AppComponent } from 'src/app/app.component';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  name = new FormControl('', [Validators.required]);
  alpha = new FormControl('', [Validators.required]);
  capital = new FormControl('', [Validators.required]);
  population = new FormControl('', [Validators.required]);
  borders = new FormControl([]);
  app: AppComponent;

  nameRes: any = '';
  alphaRes: any = '';
  capitalRes: any = '';
  populationRes: any = '';
  bordersRes: any = '';

  constructor(private dialogRef: MatDialogRef<any>) {}

  ngOnInit(): void {}

  getErrorMessage(prop) {
    return prop.hasError('required') ? 'You must enter a value' : '';
  }

  onSubmit(): void {
    if (
      this.name.value == '' ||
      this.alpha.value == '' ||
      this.capital.value == '' ||
      this.population.value == ''
    ) {
    } else {
      this.nameRes = this.name.value;
      this.alphaRes = this.alpha.value;
      this.capitalRes = this.capital.value;
      this.populationRes = this.population.value;
      this.bordersRes = this.borders.value;
      if (this.population.value != '') {
        this.bordersRes = this.bordersRes.split(',');
      }

      this.dialogRef.close({
        data: {
          name: this.nameRes,
          cca3: this.alphaRes,
          capital: this.capitalRes,
          population: this.populationRes,
          borders: this.bordersRes,
        },
      });
      //reset
      this.name = new FormControl('', [Validators.required]);
      this.alpha = new FormControl('', [Validators.required]);
      this.capital = new FormControl('', [Validators.required]);
      this.population = new FormControl('', [Validators.required]);
      this.borders = new FormControl();
    }
  }
}
