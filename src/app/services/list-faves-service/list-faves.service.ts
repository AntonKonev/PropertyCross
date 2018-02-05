import { Injectable } from '@angular/core';
import { LocalStorageService } from 'src/app/services/local-storage-service/local-storage.service';

@Injectable()
export class ListFavesService {
    public _listOfFaves: any[] = [];

    constructor(
        private localstorage: LocalStorageService
    ) {
        this._listOfFaves = this.localstorage.getData('listOfFaves');
    }

    public setData(data: any): void {
        this.listOfFaves.push(data);
        this.localstorage.setData('listOfFaves', this.listOfFaves);
    }

    public get listOfFaves(): any[] {
        return this._listOfFaves;
    }

    public deleteElementFromList(urlOfRemovedHouse: string): void {
        const pos: number = this.listOfFaves.findIndex(({lister_url: urlOfFaveHouse}) => {
            if (urlOfFaveHouse.slice(34, 59) === urlOfRemovedHouse.slice(34, 59)) {
                return true;
            }
        });
        this.listOfFaves.splice(pos, 1);
        this.localstorage.setData('listOfFaves', this.listOfFaves);
    }

    public checkUniqState(urlOfSelectedHouse: string): boolean {
        let result: boolean = false;
        this.listOfFaves.forEach(({lister_url: urlOfFaveHouse}) => {
            if (urlOfFaveHouse.slice(34, 59) === urlOfSelectedHouse.slice(34, 59)) {
                result = true;
            }
        });
        return result;
    }
}

