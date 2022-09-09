import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-add-book-modal',
  templateUrl: './add-book-modal.component.html',
  styleUrls: ['./add-book-modal.component.scss']
})
export class AddBookModalComponent implements OnInit {

  public addBookForm: FormGroup;

  constructor(
    public modalRef: BsModalRef
  ) {
    this.addBookForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      author: new FormControl(null, [Validators.required]),
      genre: new FormControl(null, [Validators.required]),
      isbn13: new FormControl(null, [Validators.required]),
      imageUrl: new FormControl(null, [Validators.required])
    });
  }

  ngOnInit(): void {
  }

  onSubmit() {
    console.log(this.addBookForm.value);
    this.modalRef.hide();
  }

}
