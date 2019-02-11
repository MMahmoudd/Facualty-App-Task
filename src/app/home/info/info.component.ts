import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Router} from '@angular/router';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  data: any;
  faculty: any[] = [];
  facultySelected: number;
  modifedText: string;
  modalRef: BsModalRef;
  message: string;


  itemArray = [];
  itemList: AngularFireList<any>;

  constructor(private modalService: BsModalService,
              public db: AngularFireDatabase,
              public router: Router) {
    this.itemList = db.list('student');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
        let y = action.payload.toJSON();
        y ['$key'] = action.key;
        this.itemArray.push(y as StudentClass);
      });
    });
  }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, {class: 'modal-md'});
  }

  confirm($key): void {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  decline(): void {
    this.message = 'Declined!';
    this.modalRef.hide();
  }

  onEdit(studentName, faculty, phone, date, address, url) {
    this.message = 'Confirmed!';
    this.modalRef.hide();
  }

  cancel() {
    this.message = 'cancelld';
    this.modalRef.hide()
  }

  ngOnInit() {

    this.data = {
      studentName: '',
      phone: '',
      date: '',
      address: ''
    };

    this.faculty = [
      {Id: 1, name: 'Cairo'},
      {Id: 2, name: 'Alex'},
      {Id: 3, name: 'Helwan'},
      {Id: 4, name: 'AUC'},
      {Id: 5, name: 'ain shams'}
    ];
    this.facultySelected = 2;
  }

  onFaculatySelected(val: any) {
    this.customFunction(val);
  }

  customFunction(val: any) {
    this.modifedText = 'the value ' + val + ' was selected from dropdown';
  }
}


export class StudentClass {
  $key: string;
  name: string;
  phone: string;
  date: Date;
  address: string;
  faculty: string;
}
