import { Component, OnInit } from '@angular/core';

import { DataFromServerService } from 'src/app/services/data-from-server-service/data-from-server.service';
import { ListSearchesService } from 'src/app/services/list-searches-service/list-searches.service';
import { RedirectionService } from 'src/app/services/redirection-service/redirection.service';

import { TimerObservable } from 'rxjs/observable/TimerObservable';
import { Subscription } from 'rxjs/Subscription';
import { Observable } from 'rxjs';

const myLocation: string = 'My Location'

@Component({
    selector: 'app-home-component',
    templateUrl: './home-component.component.html',
    styleUrls: ['./home-component.component.css']

})
export class HomeComponentComponent implements OnInit {
    public cityTextField: string;
    public errMassage: string;
    public timerSubscription: Subscription;
    private timerOfGettingData: Observable<number>;
    public isSearchInProgress: boolean;
    public recentSearches = [];
    public coords: string;
    private dataSubscription: Subscription;
    public search = {
        textOfRequest: '',
        unformatedUrl: '',
        result: 0,
        total_pages: 0,
        curPage: 1
    };

    constructor(
        private list: ListSearchesService,
        private data: DataFromServerService,
        private redirect: RedirectionService
    ) {}

    public goToFaves(): void {
        this.redirect.redirectToFaves();
    }

    public goToRecentSearch(searchInform, index): void {
        this.list.removeSearch(index);
        if (searchInform.textOfRequest === myLocation) {
            this.searchOnMyLocation();
        } else {
            this.searchLocation(searchInform.textOfRequest);
        }
    }

    public searchOnMyLocation(): void {
        this.makeRequest(this.coords);
    }

    public searchLocation(param: string = 'newcastle'): void {
        param = param.trim();
        if (param == "") {
            param = "newcastle";
        }
        param = `place_name=${param}`;
        this.makeRequest(param);
    }

    public get isNoRecentSearches() {
        return this.recentSearches.length === 0 && !this.errMassage;
    }

    private configSearchObj(addUrl: string, {response: {total_results,total_pages}}): void {
        addUrl.search(/centre_point=/i) !== -1 ? this.search.textOfRequest = myLocation : this.search.textOfRequest = addUrl.slice(11);
        this.search.unformatedUrl = addUrl;
        this.search.result = total_results - 1;
        this.search.total_pages = total_pages + 1;
    }

    private configDataOfResponse(data: any, addUrl: string,{response:{application_response_code,listings}} = data): void {
        this.data.setDataFromServer(listings);
        this.data.setErrMassage(application_response_code, data);
        this.configSearchObj(addUrl, data);
        if(!this.data.errMassage) {
            this.list.setSearch(this.search);
        }
    }

    public showException(error) {
        this.errMassage = error;
        this.cityTextField = '';
        this.isSearchInProgress = true;
    }

    public setCurrentCoords(): void {
        navigator.geolocation.getCurrentPosition(({coords: {latitude,longitude}}) => {
            this.coords = `centre_point=${latitude},${longitude}`;
            // //this.coords = "centre_point=51.684183,-3.431481" //for testing My Location Button
        });
    }

    public makeRequest(addUrl?: string) {
        this.isSearchInProgress = false;
        this.data.clearErrMassage();
        this.dataSubscription = this.data.makeRequestForData(addUrl).subscribe(data => {
            this.timerSubscription.unsubscribe();
            this.configDataOfResponse(data, addUrl);

            if (!this.data.errMassage) {
                this.redirect.redirectToSearch();
            } else {
                this.showException(this.data.errMassage);
            }
        });

        this.timerOfGettingData = TimerObservable.create(5000);
        this.timerSubscription = this.timerOfGettingData.subscribe(() => {
            this.dataSubscription.unsubscribe();
            console.log(this.data.dataFromServer);
            if (!this.data.dataFromServer.length) {
                this.data.setErrMassage("999");
                this.showException(this.data.errMassage);
            }
            this.timerSubscription.unsubscribe();
        });
    }

    ngOnInit(): void {
        this.isSearchInProgress = true;
        this.setCurrentCoords();
        this.recentSearches = this.list.getListOfSearches();
        this.data.clearData();
        this.errMassage = this.data.errMassage;
    }
}
