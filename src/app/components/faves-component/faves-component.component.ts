import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { RedirectionService } from 'src/app/services/redirection-service/redirection.service';
import { ListFavesService } from 'src/app/services/list-faves-service/list-faves.service';

@Component({
    selector: 'app-faves-component',
    templateUrl: 'faves-component.component.html',
    styleUrls: ['faves-component.component.css']
})
export class FavesComponentComponent implements OnInit {
    public listOfFaves: Array<any>;

    constructor(
        private list: ListFavesService,
        private _location: Location,
        private redirection: RedirectionService
    ) {
    }

    ngOnInit() {
        this.listOfFaves = this.list.listOfFaves;
    }

    public goBack(): void {
        this._location.back();
    }

    public goHome(): void {
        this.redirection.redirectToHome();
    }

    public removeFromFaves(house: any): void {
        this.list.deleteElementFromList(house);
    }


}
