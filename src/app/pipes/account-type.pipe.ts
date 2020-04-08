import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'accountType' })
export class AccountTypePipe implements PipeTransform {
    transform(value: string): string {
        switch (value) {
            case 'credit':
                return 'Kredyt';
            case 'saving':
                return 'Konto oszczędnościowe';
            case 'private':
                return 'Konto prywatne';
        }
    }
}
