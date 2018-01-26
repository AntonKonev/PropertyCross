import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Injectable()
export class ListSearchesService {
    public listOfSearches = [];

    constructor(
        private localstorage: LocalStorageService
    ) {
        this.listOfSearches = localstorage.getData('listOfSearches');
    }


    public setSearch(dataOfSearch): void {
        this.listOfSearches.unshift(dataOfSearch);
        this.localstorage.setData('listOfSearches', this.listOfSearches.slice(0, 5));

    }

    public getListOfSearches(): Array<Object> {
        return this.listOfSearches;
    }

    public removeSearch(pos): void {
        this.listOfSearches.splice(pos, 1);
    }

    public clearListOfSearches(): void {
        this.listOfSearches = [];
    }

    public getLastSearch(): any {
        return this.listOfSearches[0];
    }
}
