import { Component, EventEmitter, forwardRef, Input, OnInit, Output } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    }
  ]
})
export class InputComponent implements OnInit, ControlValueAccessor {
  @Input() element: any = {};
  @Output() formChanged = new EventEmitter<any>();

  public value: string = '';
  public isDisabled: boolean;
  public onChange = (_: any) => { }
  public onTouch = () => { }

  public inputFormGroup: FormGroup;
  public formSubscription$: Subscription;

  constructor(
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.inputFormGroup = this.createForm();
  }

  createForm(): FormGroup {
    const inputFormGroup: FormGroup | any = {};
    inputFormGroup[this.element.id] = this.formBuilder.control('', this.element.required ? Validators.required : []);
    return this.formBuilder.group(inputFormGroup);
  }

  onInput(value: string) {
    this.value = value;
    this.onTouch();
    this.onChange(this.value);
  }

  writeValue(value: any): void {
    if (value) {
      this.value = value || '';
    } else {
      this.value = '';
    }
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }
  setDisabledState(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }
}
