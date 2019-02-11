import {Component, OnInit} from '@angular/core';
import {AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import {FileUpload} from '../upload/fileupload';
import {UploadFileService} from '../upload/upload-file.service';
import {Router} from '@angular/router';


@Component({
    selector: 'app-student',
    templateUrl: './student.component.html',
    styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {


    data: any;
    faculty: any[] = [];
    facultySelected: number;
    modifedText: string;


    itemList: AngularFireList<any>;
    selectedFiles: FileList;
    currentFileUpload: FileUpload;


    constructor(public db: AngularFireDatabase,
                private uploadService: UploadFileService,
                public router: Router) {
        this.itemList = db.list('student');
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

    selectFile(event) {
        this.selectedFiles = event.target.files;
    }

    addInfo() {
        const file = this.selectedFiles.item(0);
        this.selectedFiles = undefined;
        this.currentFileUpload = new FileUpload(file);
        this.uploadService.pushFileToStorage(this.currentFileUpload, this.data, this.facultySelected);
        // alert('success');
        //
        this.router.navigate(['/home']);
    }

    foo(value) {
        console.log(value);
    }

}
