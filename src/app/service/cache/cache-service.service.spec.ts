import { TestBed } from '@angular/core/testing';
import { CacheService } from './cache.service';

describe('CacheServiceService', () => {
    let service: CacheService<any>;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(CacheService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
