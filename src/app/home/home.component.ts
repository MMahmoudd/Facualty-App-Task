import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = true;
  data: any;
  faculty: any[] = [];
  facultySelected: number;
  itemArray = [];
  itemList: AngularFireList <any>;


  constructor(public db: AngularFireDatabase,
              public router: Router) {
    this.itemList = db.list('student');

    this.itemList.snapshotChanges().subscribe(actions => {
      actions.forEach(action => {
       let y = action.payload.toJSON();
       y ['$key'] = action.key;
       this.itemArray.push(y as ListItemClass);
      });
    });
    console.log(this.itemArray);
  }


  toggleCollapse( clickedItem ) {

    this.router.navigate(['home', clickedItem.$key]);

     this.isCollapsed = !this.isCollapsed;




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

}


export class ListItemClass {
  $key: string;
  studentName: string;
  url: any;
  phone: string;
  date: string;
  address: string;
  faculty: string;
}
