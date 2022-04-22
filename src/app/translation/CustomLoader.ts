import { TranslateLoader } from '@ngx-translate/core';
import { Observable, of } from 'rxjs';
import eng from '../../assets/i18n/en.json';
import jp from '../../assets/i18n/jp.json';
import zh from '../../assets/i18n/zh.json';

export default class CustomLoader implements TranslateLoader {
    getTranslation(lang: string): Observable<any> {
        switch (lang) {
            case 'eng':
                return of(eng);
            case 'zh':
                return of(zh);
            case 'jp':
                return of(jp);
            default:
                return of(eng);
        }
    }
}
