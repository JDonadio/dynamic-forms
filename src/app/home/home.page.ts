import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {

  public dynamicForm: FormGroup;
  public list = [];

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit() {
    this.dynamicForm = this.createForm();
  }

  private createForm(): FormGroup {
    this.list = this.getList();
    let group: FormGroup | any = {};
    let control: FormControl;

    this.list.forEach(item => {
      console.log(item)
      control = this.fb.control('', item.required ? Validators.required : []);
      group[item.id] = control;
    })
    return this.fb.group(group);
  }

  print() {
    console.log('this.dynamicForm:', this.dynamicForm)
  }

  getList() {
    return [
      {
        id: '1',
        type: 'text',
        label: 'User name',
        required: true,
      },
      {
        id: '2',
        type: 'email',
        label: 'Email',
        required: false,
      },
      {
        id: '3',
        type: 'number',
        label: 'DNI',
        required: false,
      },
      {
        id: '4',
        type: 'phone',
        label: 'Cellphone',
        required: false,
      },
    ]
  }
}
