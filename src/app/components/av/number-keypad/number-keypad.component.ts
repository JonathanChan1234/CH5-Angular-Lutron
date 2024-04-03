import { Component, Input, OnInit } from '@angular/core';
import { pulse } from 'src/app/crestron/crestron-utils';
import { Av } from 'src/app/model/av';

type Key =
    | '1'
    | '2'
    | '3'
    | '4'
    | '5'
    | '6'
    | '7'
    | '8'
    | '9'
    | '0'
    | '*'
    | '#';

@Component({
    selector: 'app-number-keypad',
    templateUrl: './number-keypad.component.html',
    styleUrls: ['./number-keypad.component.scss'],
})
export class NumberKeypadComponent implements OnInit {
    @Input()
    size: 'small' | 'medium' | 'large' = 'large';

    @Input()
    av: Av;

    constructor() {}

    ngOnInit(): void {}

    onKeypadClick(key: Key): void {
        switch (key) {
            case '1':
                if (!this.av?.key1) return;
                pulse(this.av.key1);
                break;
            case '2':
                if (!this.av?.key2) return;
                pulse(this.av.key2);
                break;
            case '3':
                if (!this.av?.key3) return;
                pulse(this.av.key3);
                break;
            case '4':
                if (!this.av?.key4) return;
                pulse(this.av.key4);
                break;
            case '5':
                if (!this.av?.key5) return;
                pulse(this.av.key5);
                break;
            case '6':
                if (!this.av?.key6) return;
                pulse(this.av.key6);
                break;
            case '7':
                if (!this.av?.key7) return;
                pulse(this.av.key7);
                break;
            case '8':
                if (!this.av?.key8) return;
                pulse(this.av.key8);
                break;
            case '9':
                if (!this.av?.key9) return;
                pulse(this.av.key9);
                break;
            case '0':
                if (!this.av?.key0) return;
                pulse(this.av.key0);
                break;
            case '*':
                if (!this.av?.asterisk) return;
                pulse(this.av.asterisk);
                break;
            case '#':
                if (!this.av?.hash) return;
                pulse(this.av.hash);
                break;
        }
    }
}
