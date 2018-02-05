import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

import { DataFromServerService } from 'src/app/services/data-from-server-service/data-from-server.service';
import { SelectedHouseService } from 'src/app/services/selected-house-service/selected-house.service';
import { ListSearchesService } from 'src/app/services/list-searches-service/list-searches.service';
import { RedirectionService } from 'src/app/services/redirection-service/redirection.service';

import { Subscription, Observable } from 'rxjs';
import { TimerObservable } from 'rxjs/observable/TimerObservable';


@Component({
    selector: 'app-search-component',
    templateUrl: './search-component.component.html',
    styleUrls: ['./search-component.component.css']
})

export class SearchComponentComponent implements OnInit {

    public dataFromServer: Array <any>;
    public totalResults: number;
    public curResults: number;
    public btnLoadMoreStatus: boolean = false;
    public dataSubscription: Subscription;
    public timerSubscription: Subscription;
    private timerOfGettingData: Observable<number>;
    private flagOfRecivingNewData: any;

    constructor(
        private data: DataFromServerService,
        private selected: SelectedHouseService,
        private listOfSearches: ListSearchesService,
        private location: Location,
        private redirect: RedirectionService
    ) {}

    ngOnInit(): void {
        this.setBtnLoadMoreStatus();
        this.fixDataState();
        this.totalResults = this.listOfSearches.getLastSearch().result;
        this.data.clearErrMassage();
    };

    public goBack(): void {
        this.location.back();
    }

    public goToFaves(): void {
        this.redirect.redirectToFaves();
    }

    public selectHouse(house): void {
        this.selected.dataOfSelectedHouse = house;
        this.redirect.redirectToSelectedHouse();
    }

    private setBtnLoadMoreStatus(): void {
        this.btnLoadMoreStatus = this.data.dataFromServer.length === this.listOfSearches.getLastSearch().result;
    }

    public loadMore(): void {
        this.listOfSearches.getLastSearch().curPage++;
        this.btnLoadMoreStatus = true;
        const {unformatedUrl, curPage} = this.listOfSearches.getLastSearch();
        this.dataSubscription = this.data.makeRequestForData(unformatedUrl,curPage)
            .subscribe((data, {response: {listings}} = data) => {
            this.data.setDataFromServer(listings);
            this.dataFromServer = this.data.dataFromServer;
            this.curResults = this.dataFromServer.length;
            this.setBtnLoadMoreStatus();
            this.timerSubscription.unsubscribe();
            this.dataSubscription.unsubscribe();
        });

        this.timerOfGettingData = TimerObservable.create(10000);
        this.timerSubscription = this.timerOfGettingData.subscribe(() => {
            this.dataSubscription.unsubscribe();
            if (!this.flagOfRecivingNewData) {
                this.data.setErrMassage("999");
                this.redirect.redirectToHome();
            }
            this.timerSubscription.unsubscribe();
        });
    }

    private fixDataState(): void {
        this.dataFromServer = this.data.dataFromServer;
        this.curResults = this.dataFromServer.length;
    }
}

