export class FileUpload {

    key: string;
    studentName: string;
    name: string;
    url: string;
    phone: string;
    date: string;
    address: string;
    faculty: number;
    file: File;

    constructor(file: File) {
        this.file = file;
    }
}
