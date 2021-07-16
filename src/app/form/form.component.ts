import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

import { map } from 'rxjs/operators';

@Component({
  selector: 'form-app',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
  interpolation: ['{{', '}}'],
})
export class FormComponent implements OnInit {
  formGroupControl: FormGroup;
  constructor() {}

  disabled: boolean = true;

  versions = [
    { title: ['1.1.1'] },
    { title: ['2.1.2'] },
    { title: ['3.3.1'] },
    { title: ['2.1.2'] },
    { title: ['3.2.4'] },
    { title: ['4.3.1'] },
    { title: ['3.3.1'] },
    { title: ['5.2.1'] },
    { title: ['5.1.3'] },
  ];

  reload = [
    { title: ['1.1.1'] },
    { title: ['2.1.2'] },
    { title: ['3.3.1'] },
    { title: ['2.1.2'] },
    { title: ['3.2.4'] },
    { title: ['4.3.1'] },
    { title: ['3.3.1'] },
    { title: ['5.2.1'] },
    { title: ['5.1.3'] },
  ];

  getValueFramework(event: any) {
    console.log(event.title);
    this.versions = this.reload;
    let reloadA = this.versions.slice(0, 3);
    let reloadV = this.versions.slice(3, 6);
    let reloadR = this.versions.slice(6, 9);

    if (event.title == 'Angular') {
      this.versions = reloadA;
    }

    if (event.title == 'Vue') {
      this.versions = reloadV;
    }

    if (event.title == 'React') {
      this.versions = reloadR;
    }

    if (event.title) {
      this.disabled = false;
    }

    if (event.title == undefined) {
      this.disabled = true;
    }
  }

  frameworks = [{ title: 'Angular' }, { title: 'Vue' }, { title: 'React' }];
  title: string = '';
  ngOnInit(): void {
    this.formGroupControl = new FormGroup({
      firstName: new FormControl(),
      lastName: new FormControl(),
      dateOfBirth: new FormControl(),
      framework: new FormControl(),
      version: new FormControl(),
      email: new FormControl(),
      hobby: new FormGroup({
        name: new FormControl(),
        duration: new FormControl(),
        nameTwo: new FormControl(),
        durationTwo: new FormControl(),
      }),
    });

    this.formGroupControl.valueChanges
      .pipe(
        map((v) => {
          if (v.dateOfBirth) {
            v.dateOfBirth = `${v.dateOfBirth.getDate()}-${
              v.dateOfBirth.getMonth() + 1
            }-${v.dateOfBirth.getFullYear()}`;
          }

          if (v.framework) {
            v.framework = v.framework.title;
          }

          if (v.version) {
            v.version = v.version.title[0];
          }

          if (v.hobby) {
            v.hobby = [v.hobby];
          }

          setTimeout(() => {
            fetch(`https://jsonplaceholder.typicode.com/${v.email}`).then(
              (response) => {
                if (!response.ok && v.email == 'test@test.test') {
                  alert('Email is busy, enter another please');
                }
              }
            );
          }, 2000);

          return v;
        })
      )
      .subscribe((v) => {
        console.log(v);
        let result = JSON.stringify(v);
        console.log(result);
        this.title = result;
      });
    this.formGroupControl.statusChanges.subscribe((v) => {
      if (v === 'VALID') {
      }
    });
  }
}
