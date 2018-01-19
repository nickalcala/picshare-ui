import { Injectable } from "@angular/core";
import { Http } from "@angular/http";
import { Picture } from "../models/picture";
import { FileUploader } from "ng2-file-upload";
import { environment } from "../../environments/environment";
import { SessionService } from "./session.service";

@Injectable()
export class PictureService {

    uploader: FileUploader = new FileUploader({
        url: environment.apiEndpoint + '/api/pictures'
    });

    constructor(
        private http: Http,
        private sessionService: SessionService
    ) {
        this.uploader.onAfterAddingFile = (item => {
            item.withCredentials = false;
        });
    }

    getTenLatest(page = 1) {
        return this.http.get('pictures?page=' + page)
            .map(response => {
                let json = response.json();
                let pictures: Picture[] = [];
                json.data.forEach(p => {
                    let picture = new Picture;
                    picture.id = p.id;
                    picture.title = p.title;
                    picture.description = p.description;
                    picture.filename = p.filename;
                    picture.createdAt = p.created_at;
                    pictures.push(picture);
                });
                return pictures;
            });
    }

    upload(picture: Picture) {
        this.uploader.authToken = 'Bearer ' + this.sessionService.currentUser.accessToken;
        this.uploader.onBuildItemForm = (file, form) => {
            form.append('title', picture.title);
            form.append('description', picture.description);
        };
        this.uploader.uploadAll();
    }
}