import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { SelectedHouseService } from 'src/app/services/selected-house-service/selected-house.service';
import { RedirectionService } from 'src/app/services/redirection-service/redirection.service';
import { ListFavesService } from 'src/app/services/list-faves-service/list-faves.service';


@Component({
    selector: 'app-selected-house-component',
    templateUrl: 'selected-house-component.component.html',
    styleUrls: ['selected-house-component.component.css']
})
export class SelectedHouseComponentComponent implements OnInit {
    public dataOfHouse: any;
    public flagOfFaves: boolean;

    constructor(
        private selected: SelectedHouseService,
        private list: ListFavesService,
        private location: Location,
        private redirect: RedirectionService
    ) {
        this.flagOfFaves = true;
    }

    ngOnInit(): void {
        this.dataOfHouse = this.selected.dataOfSelectedHouse;
        console.log(this.dataOfHouse);
        if(this.dataOfHouse) {
            this.checkUniqState(this.dataOfHouse);
        }

    }

    public goBack(): void {
        this.location.back();
    }

    public goHome(): void {
        this.redirect.redirectToHome();
    }

    public addToFaves(dataOfHouse: any): void {
        this.flagOfFaves = true;
        this.list.setData(dataOfHouse);
    }

    public removeFromFaves({lister_url: urlOfRemovedHouse}): void {
        this.flagOfFaves = false;
        this.list.deleteElementFromList(urlOfRemovedHouse);
    }

    public checkUniqState ({lister_url: urlOfSelectedHouse}): void {
        this.flagOfFaves = this.list.checkUniqState(urlOfSelectedHouse);
    }

    public goToFaves(): void {
        this.redirect.redirectToFaves();
    }
}
