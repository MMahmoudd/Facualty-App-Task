import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  isCollapsed = true;

  itemArray = [];
  itemList: AngularFireList <any>;


  constructor(public db: AngularFireDatabase) {
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


  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }

  ngOnInit() {

  }

}


export class ListItemClass {
  $key: string;
  name: string;
  phone: string;
  date: string;
  address: string;
  faculty: string;
}
