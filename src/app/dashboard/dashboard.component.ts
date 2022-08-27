import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../shared/api.service';
import { StudentModel } from './dashboard.model';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  formValue!: FormGroup;
  studentModelObj: StudentModel = new StudentModel();
  studentData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;
  constructor(private formbuilber: FormBuilder, private api: ApiService) {}

  ngOnInit(): void {
    this.formValue = this.formbuilber.group({
      name: [''],
      phone: [''],
      email: [''],
      address: [''],
      gender: [''],
    });

    this.getAllStudent();
  }
  clickAddStudent() {
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }
  postDetails() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.phone = this.formValue.value.phone;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.address = this.formValue.value.address;
    this.studentModelObj.gender = this.formValue.value.gender;

    this.api.Post(this.studentModelObj).subscribe(
      (res) => {
        console.log(res);
        alert('Student Added Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllStudent();
      },
      (err) => {
        alert('Something Went Wrong');
      }
    );
  }
  getAllStudent() {
    this.api.Get().subscribe((res) => {
      this.studentData = res;
    });
  }
  deletStudent(row: any) {
    this.api.Delete(row.id).subscribe((res) => {
      alert('Student Deleted');
      this.getAllStudent();
    });
  }
  onEdit(row: any) {
    this.showAdd = false;
    this.showUpdate = true;
    this.studentModelObj.id = row.id;
    this.formValue.controls['name'].setValue(row.name);
    this.formValue.controls['phone'].setValue(row.phone);
    this.formValue.controls['email'].setValue(row.email);
    this.formValue.controls['address'].setValue(row.address);
    this.formValue.controls['gender'].setValue(row.gender);
  }
  UpdateDetails() {
    this.studentModelObj.name = this.formValue.value.name;
    this.studentModelObj.phone = this.formValue.value.phone;
    this.studentModelObj.email = this.formValue.value.email;
    this.studentModelObj.address = this.formValue.value.address;
    this.studentModelObj.gender = this.formValue.value.gender;

    this.api
      .Updat(this.studentModelObj, this.studentModelObj.id)
      .subscribe((res) => {
        alert('Updated Successfully');
        let ref = document.getElementById('cancel');
        ref?.click();
        this.formValue.reset();
        this.getAllStudent();
      });
  }
}
