import { Component, OnInit, HostListener } from "@angular/core";
import { PictureService } from "../../services/picture.service";
import { environment } from "../../../environments/environment";
import { Picture } from "../../models/picture";

@Component({
    templateUrl: 'home.component.html'
})
export class HomeComponent implements OnInit {

    mediaUrl = '';
    pictures: Picture[] = [];
    tmpPictures: Picture[] = [];
    isLoading = false;
    page = 1;

    constructor(
        private pictureService: PictureService
    ) {
        this.mediaUrl = environment.mediaEndpoint;
    }

    ngOnInit() {
        this.isLoading = true;
        this.loadPictures();
    }

    loadPictures() {
        this.pictureService.getTenLatest(this.page)
            .subscribe(response => {
                this.tmpPictures = response;
                this.tmpPictures.forEach(p => {
                    this.pictures.push(p);
                });
                this.isLoading = false;
            });
    }

    @HostListener('window:scroll', ['$event'])
    onWindowScroll() {
        if (window.innerHeight + window.scrollY === document.body.scrollHeight && !this.isLoading && this.tmpPictures.length > 0) {
            this.page++;
            this.loadPictures();
        }
    }
}