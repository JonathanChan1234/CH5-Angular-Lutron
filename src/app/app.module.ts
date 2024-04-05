import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSelectModule } from '@angular/material/select';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserModule } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { AppComponent } from './app.component';
import { AcControlPanelComponent } from './components/ac/ac-control-panel/ac-control-panel.component';
import { AppToolbarComponent } from './components/app-toolbar/app-toolbar.component';
import { AvDeviceComponent } from './components/av-device/av-device.component';
import { AvCustomDpadComponent } from './components/av/av-custom-dpad/av-custom-dpad.component';
import { AvOptionBarComponent } from './components/av/av-option-bar/av-option-bar.component';
import { FunctionButtonComponent } from './components/av/function-button/function-button.component';
import { MediaKeypadComponent } from './components/av/media-keypad/media-keypad.component';
import { NumberKeypadComponent } from './components/av/number-keypad/number-keypad.component';
import { UpdownButtonGroupComponent } from './components/av/updown-button-group/updown-button-group.component';
import { DeviceTileComponent } from './components/device/device-tile/device-tile.component';
import { ErrorMessageBarComponent } from './components/error-message-bar/error-message-bar.component';
import { LightControlPanelComponent } from './components/light/light-control-panel/light-control-panel.component';
import { RoomSelectionBarComponent } from './components/room-selection-bar/room-selection-bar.component';
import { ShadeControlPanelComponent } from './components/shade/shade-control-panel/shade-control-panel.component';
import { ControlPanelComponent } from './components/utils/control-panel/control-panel.component';
import { IconButtonComponent } from './components/utils/icon-button/icon-button.component';
import { RoundedIconButtonComponent } from './components/utils/rounded-icon-button/rounded-icon-button.component';
import { SelectOptionsDialogComponent } from './components/utils/select-options-dialog/select-options-dialog.component';
import { SliderToggleComponent } from './components/utils/slider-toggle/slider-toggle.component';
import { SliderComponent } from './components/utils/slider/slider.component';
import { StopPropagationDirective } from './directive/stop-propagation.directive';
import { ApiInterceptor } from './http/ApiInterceptor';
import { AcControlComponent } from './page/ac-control/ac-control.component';
import { AvRemoteLandscapeComponent } from './page/av/av-remote-landscape/av-remote-landscape.component';
import { AvRemoteMobileComponent } from './page/av/av-remote-mobile/av-remote-mobile.component';
import { AvRemotePortraitComponent } from './page/av/av-remote-portrait/av-remote-portrait.component';
import { AvRemoteComponent } from './page/av/av-remote/av-remote.component';
import { DeviceOverviewComponent } from './page/device-overview/device-overview.component';
import { LightingComponent } from './page/lighting/lighting.component';
import { SettingComponent } from './page/setting/setting.component';
import { ShadeComponent } from './page/shade/shade.component';
import CustomLoader from './translation/CustomLoader';

@NgModule({
    declarations: [
        AppComponent,
        ErrorMessageBarComponent,
        StopPropagationDirective,
        SettingComponent,
        AvDeviceComponent,
        AvRemoteComponent,
        AvOptionBarComponent,
        UpdownButtonGroupComponent,
        MediaKeypadComponent,
        NumberKeypadComponent,
        IconButtonComponent,
        FunctionButtonComponent,
        AvRemoteLandscapeComponent,
        AvRemotePortraitComponent,
        AvRemoteMobileComponent,
        AppToolbarComponent,
        AvCustomDpadComponent,
        SliderComponent,
        AcControlComponent,
        AcControlPanelComponent,
        ShadeComponent,
        ShadeControlPanelComponent,
        LightingComponent,
        LightControlPanelComponent,
        ControlPanelComponent,
        RoundedIconButtonComponent,
        DeviceOverviewComponent,
        DeviceTileComponent,
        RoomSelectionBarComponent,
        SelectOptionsDialogComponent,
        SliderToggleComponent,
    ],
    imports: [
        BrowserModule,
        // BrowserAnimationsModule,
        NoopAnimationsModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        MatCardModule,
        MatButtonModule,
        MatToolbarModule,
        MatIconModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatTableModule,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,
        MatListModule,
        MatSnackBarModule,
        MatDialogModule,
        MatDividerModule,
        MatMenuModule,
        MatTooltipModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useClass: CustomLoader,
            },
        }),
    ],
    providers: [
        { provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true },
    ],
    bootstrap: [AppComponent],
    schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
