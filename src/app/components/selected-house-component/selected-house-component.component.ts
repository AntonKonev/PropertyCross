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
        private _location: Location,
        private redirect: RedirectionService
    ) {
        this.flagOfFaves = true;
    }

    ngOnInit(): void {
        this.dataOfHouse = this.selected.dataOfSelectedHouse;
        console.log(this.dataOfHouse);
        if(this.dataOfHouse) {
            this.checkingOfUniq(this.dataOfHouse);
        }

    }

    public goBack(): void {
        this._location.back();
    }

    public goHome(): void {
        this.redirect.redirectToHome();
    }

    public addToFaves(dataOfHouse: any): void {
        this.flagOfFaves = true;
        this.list.setData(dataOfHouse);
    }

    public removeFromFaves(dataOfHouse: any): void {
        this.flagOfFaves = false;
        this.list.deleteElementFromList(dataOfHouse);
    }

    public checkingOfUniq (house: any): void {
        this.flagOfFaves = this.list.chekingOfUniq(house);
    }

    public goToFaves(): void {
        this.redirect.redirectToFaves();
    }
}
