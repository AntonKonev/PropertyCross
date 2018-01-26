import {Injectable} from '@angular/core';

@Injectable()
export class LocalStorageService {

    public getData(storageName: string) {
        if (!this.haslocalStorage(storageName)) {
            return [];
        } else {
            return JSON.parse(localStorage[storageName]);
        }
    }

    public setData(storageName: string, data) {
        localStorage[storageName] = JSON.stringify(data);
    }

    public removeData(storageName: string) {
        localStorage.removeItem(`${storageName}`);
    }

    private haslocalStorage(storageName:string){
        return localStorage[storageName];
    }
}
