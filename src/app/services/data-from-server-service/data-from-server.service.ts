import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Response, Jsonp } from "@angular/http";
import 'rxjs/add/operator/map';

@Injectable()
export class DataFromServerService {
    private _errMassage: string;
    private _dataFromServer: any[] = [];
    public arrCodeStatus: string[] = ['100', '101', '102', '200', '202'];

    constructor(
        private http: HttpClient,
        private jsonp: Jsonp
    ) {}

    public makeRequestForData(addLocation: string, page: number = 1) {
        const url = this.createRequestUrl(addLocation, page);
        return this.jsonp.request(url, {method: 'GET'}).map((res: Response) => res.json());
    }

    public setDataFromServer(listOfHouse: any): void{
        this._dataFromServer = this._dataFromServer.concat(listOfHouse);
    }

    public get dataFromServer(): any[] {
        return this._dataFromServer;
    }

    public setErrMassage(codeStatus: string = '', data?): void {
        if (this.arrCodeStatus.indexOf(codeStatus) !== -1) {
            if (data.response.listings.length === 0) {
                this._errMassage = 'There were no properties found for the given location.';
            }
        } else {
            if(codeStatus === "999") {
                this._errMassage = 'An error occurred while searching. Please check your network connection and try again.';
            }
        }
    }

    public get errMassage(): string{
        return this._errMassage;
    }

    public clearErrMassage(): void{
        this._errMassage = undefined;
    }

    public clearData(): void{
        this._dataFromServer = [];
    }

    private createRequestUrl(addLocation: string, page: number): string {
        const baseUrl = 'http://api.nestoria.co.uk/api?country=uk&pretty=1&encoding=json&listing_type=buy&page=';
        const callbackUrl = '&callback=JSONP_CALLBACK&action=search_listings&';

        return `${baseUrl}${page}${callbackUrl}${addLocation}`;
    }
}
