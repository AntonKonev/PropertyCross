import { Injectable } from '@angular/core';

@Injectable()
export class SelectedHouseService {
  public _selectedHouseData: any;

  public get dataOfSelectedHouse(): any {
    return this._selectedHouseData;
  };

  public set dataOfSelectedHouse(house: any) {
    this._selectedHouseData = house;
  };
}
