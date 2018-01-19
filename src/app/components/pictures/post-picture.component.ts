import { environment } from '../../../environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PictureService } from '../../services/picture.service';
import { Picture } from '../../models/picture';
import { FileUploader } from 'ng2-file-upload';

@Component({
    templateUrl: 'post-picture.component.html'
})
export class PostPictureComponent implements OnInit {

    uploader;
    pictureForm: FormGroup;
    message = '';
    private file;

    constructor(
        private formBuilder: FormBuilder,
        private pictureService: PictureService
    ) {
        this.uploader = this.pictureService.uploader;
    }

    ngOnInit() {
        this.initForm();
    }

    initForm() {
        this.pictureForm = this.formBuilder.group({
            title: ['', [Validators.required]],
            description: ['', [Validators.required]],
            picture: [null, Validators.required]
        });
        this.uploader.onCompleteItem = (item: any, response: any, status: any, headers: any) => {
            this.message = 'Picture is uploaded successfully.'
            this.pictureForm.get('title').setValue('');
            this.pictureForm.get('description').setValue('');
            this.pictureForm.get('picture').setValue('');
            this.pictureForm.markAsPristine();
            for (let c in this.pictureForm.controls) {
                this.pictureForm.get(c).markAsPristine();
            }
        };
    }

    onFileChange($event) {
        this.file = $event.target.files[0];
        this.pictureForm.controls['picture'].setValue(this.file ? this.file.name : '');
    }

    upload() {
        this.pictureForm.markAsDirty();
        for (let c in this.pictureForm.controls) {
            this.pictureForm.get(c).markAsDirty();
        }
        if (this.pictureForm.invalid) {
            return;
        }
        let model = this.pictureForm.value;
        let picture = new Picture();
        picture.title = model.title;
        picture.description = model.description;
        this.pictureService.upload(picture);
    }
}