import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { HomeComponent } from '../home.component';


@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  modalRef: BsModalRef;
  message: string;


  itemArray = [];
  itemList: AngularFireList <any>;

  constructor(private modalService: BsModalService,
              public db: AngularFireDatabase) {
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


  ngOnInit() {
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
