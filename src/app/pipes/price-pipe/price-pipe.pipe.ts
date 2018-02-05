import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pricePipe'
})
export class PricePipePipe implements PipeTransform {

    transform(value: number = 0, currency: string = 'No data of currency'):string {
        let count: number = 0,
            stringValue: string = value + '',
            res: Array<string> = [];

        if (stringValue.length <= 3) {
            return stringValue;
        }

        for (let i = stringValue.length - 1; i >= 0; i--) {
            count++;
            res.unshift(stringValue[i]);
            if(count % 3 === 0 && i !== 0 ){
                res.unshift(',')
            }
        }
        return currency + res.join('');
    }
}
