import dayjs from 'dayjs';
import hash from 'hash-it';
import { Observable } from 'rxjs';

export abstract class CacheServiceService<T> {
    readonly CACHE_DURATION = 5;
    readonly DEFAULT_KEY = 'default';

    private cache: {
        [id: string]: {
            expires: Date;
            value: Observable<T>;
        };
    } = {};

    getValue(object?: object): Observable<T> | null {
        const key = object ? hash(object).toString() : this.DEFAULT_KEY;
        // if the cache does not contain the required value
        if (!this.cache[key]) return null;
        // if the cache data is already expired
        if (dayjs(new Date()).isAfter(this.cache[key].expires)) return null;
        return this.cache[key].value;
    }

    setValue(value: Observable<T>, object?: object): void {
        const key = object ? hash(object).toString() : this.DEFAULT_KEY;
        const expires = dayjs(new Date())
            .add(this.CACHE_DURATION, 'minute')
            .toDate();
        this.cache[key] = {
            expires,
            value,
        };
    }

    clearCache(object?: object) {
        const key = object ? hash(object) : this.DEFAULT_KEY;
        if (!this.cache[key]) return;
        delete this.cache[key];
    }
}
