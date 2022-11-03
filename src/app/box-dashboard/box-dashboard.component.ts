import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {BoxModel} from "./box-dashboard.model";
import {ApiService} from "../service/api.service";

@Component({
  selector: 'app-box-dashboard',
  templateUrl: './box-dashboard.component.html',
  styleUrls: ['./box-dashboard.component.scss']
})
export class BoxDashboardComponent implements OnInit {

  formValue!: FormGroup;
  boxModelObj: BoxModel = new BoxModel();
  boxData!: any;
  showAdd!: boolean;
  showUpdate!: boolean;

  constructor(private formBuilder: FormBuilder, private api: ApiService) {
  }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      size: [''],
      material: [''],
      price: [''],
      amount: ['']
    })
    this.getAllBoxes();
  }

  clickAddBox(){
    this.formValue.reset();
    this.showAdd = true;
    this.showUpdate = false;
  }

  postBoxDetails() {
    this.boxModelObj.size = this.formValue.value.size;
    this.boxModelObj.material = this.formValue.value.material;
    this.boxModelObj.price = this.formValue.value.price;
    this.boxModelObj.amount = this.formValue.value.amount;

    this.api.postBox(this.boxModelObj).subscribe(res => {
        console.log(res);
        alert("box added!")
        let ref = document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllBoxes();
      },
      err => {
        alert("you dont know how to code")
      })
  }
  getAllBoxes(){
    this.api.getBox()
      .subscribe(res=>{
        this.boxData= res;
      })
  }
  deleteBox(row : any){
    this.api.deleteBox(row.id)
      .subscribe(res=>{
        alert("Box deleted :(");
        this.getAllBoxes();
      })
  }
  onEdit(row: any){
    this.showAdd = false;
    this.showUpdate = true;
    this.boxModelObj.id= row.id;
    this.formValue.controls['size'].setValue(row.size)
    this.formValue.controls['material'].setValue(row.material)
    this.formValue.controls['price'].setValue(row.price)
    this.formValue.controls['amount'].setValue(row.amount)
  }
  updateBoxDetails(){
    this.boxModelObj.size=this.formValue.value.size;
    this.boxModelObj.material=this.formValue.value.material;
    this.boxModelObj.price=this.formValue.value.price;
    this.boxModelObj.price=this.formValue.value.amount;

    this.api.updateBox(this.boxModelObj, this.boxModelObj.id)
      .subscribe(res=>{alert("Updated!");
        let ref=document.getElementById('close')
        ref?.click();
        this.formValue.reset();
        this.getAllBoxes();
      })
  }
}
