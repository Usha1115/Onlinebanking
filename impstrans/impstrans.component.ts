import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ImpsService } from '../services/imps.service';



@Component({
  selector: 'app-impstrans',
  templateUrl: './impstrans.component.html',
  styleUrls: ['./impstrans.component.css']
})
export class ImpstransComponent implements OnInit {
  addForm: FormGroup;
  submitted: boolean = false;
  constructor(private formbuilder: FormBuilder, private router: Router, private userService: ImpsService) { }
  showMsg: boolean = false;
  ngOnInit() {
    this.addForm = this.formbuilder.group({
      fromAccount: ['', Validators.required],
      toAccount: ['', Validators.required],
      amount: ['', Validators.required],
      transactionDate: [new Date(), Validators.required],
      maturityInstruction: ['', Validators.required],
      remarks: ['', Validators.required],
    });
  }
  onSubmit() {
    //document.write("hello");
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    }
    localStorage.setItem("fAccount", this.addForm.controls['fromAccount'].value);
    if (localStorage.getItem("accnum") == this.addForm.controls['fromAccount'].value && localStorage.getItem("accnum") != this.addForm.controls['toAccount'].value ) {
      this.userService.createUser(this.addForm.value)
        .subscribe(data => {

          //localStorage.setItem("fAccount",this.addForm.controls['fromAccount'].value);
          //console.log(data);
          //localStorage.setItem("accstatid",JSON.stringify(data));
          //console.log(JSON.parse(localStorage.getItem("accstatid")).accountStatId);
          //localStorage.setItem("accstatid",this.addForm.controls["accountStatId"].value);
          this.router.navigate(['/impssucc']);
          this.showMsg = true;
        }, error => {
          alert("Please check if you've enter correct Details")
        })
    }
    else{ alert("Please Check From/To Account Number")}
  }

}
