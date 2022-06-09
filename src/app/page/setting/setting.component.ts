import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { Subscription } from 'rxjs';
import { DeviceCacheService } from 'src/app/service/room/device-cache.service';
import { RoomCacheService } from 'src/app/service/room/room-cache.service';
import { SceneCacheService } from 'src/app/service/scene/scene-cache.service';

@Component({
    selector: 'app-setting',
    templateUrl: './setting.component.html',
    styleUrls: ['./setting.component.scss'],
})
export class SettingComponent implements OnInit, OnDestroy {
    langFormControl: FormControl;
    formSubscription!: Subscription;

    constructor(
        private translate: TranslateService,
        private roomCacheService: RoomCacheService,
        private deviceCacheService: DeviceCacheService,
        private sceneCacheService: SceneCacheService
    ) {
        this.langFormControl = new FormControl(
            translate.currentLang,
            Validators.required
        );
    }

    ngOnInit(): void {
        this.formSubscription = this.langFormControl.valueChanges.subscribe(
            (lang) => this.translate.use(lang)
        );
    }

    clearCache(): void {
        this.roomCacheService.clearCache();
        this.deviceCacheService.clearCache();
        this.sceneCacheService.clearCache();
    }

    ngOnDestroy(): void {
        if (this.formSubscription) this.formSubscription.unsubscribe();
    }
}
