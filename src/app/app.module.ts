import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
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
import { CreateSceneDialogComponent } from './components/create-scene-dialog/create-scene-dialog.component';
import { DeleteSceneDialogComponent } from './components/delete-scene-dialog/delete-scene-dialog.component';
import { DimmerActionFormComponent } from './components/dimmer-action-form/dimmer-action-form.component';
import { DimmerLoadComponent } from './components/dimmer-load/dimmer-load.component';
import { ErrorMessageBarComponent } from './components/error-message-bar/error-message-bar.component';
import { LoadCardHeaderComponent } from './components/load-card-header/load-card-header.component';
import { ModalWithoutJoinComponent } from './components/modal-without-join/modal-without-join.component';
import { MotorActionFormComponent } from './components/motor-action-form/motor-action-form.component';
import { MotorLoadComponent } from './components/motor-load/motor-load.component';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { NavChildComponent } from './components/nav-child/nav-child.component';
import { RoomCardComponent } from './components/room-card/room-card.component';
import { SwitchActionFormComponent } from './components/switch-action-form/switch-action-form.component';
import { SwitchLoadComponent } from './components/switch-load/switch-load.component';
import { StopPropagationDirective } from './directive/stop-propagation.directive';
import { ApiInterceptor } from './http/ApiInterceptor';
import { MonitoringComponent } from './page/monitoring/monitoring.component';
import { RoomViewComponent } from './page/room-view/room-view.component';
import { RoomsPanelComponent } from './page/rooms-panel/rooms-panel.component';
import { SceneActionCreateComponent } from './page/scene-action-create/scene-action-create.component';
import { SceneDetailsComponent } from './page/scene-details/scene-details.component';
import { SceneTableComponent } from './page/scene-table/scene-table.component';
import { SettingComponent } from './page/setting/setting.component';
import CustomLoader from './translation/CustomLoader';

@NgModule({
    declarations: [
        AppComponent,
        ModalWithoutJoinComponent,
        NavChildComponent,
        NavBarComponent,
        RoomCardComponent,
        RoomsPanelComponent,
        MonitoringComponent,
        DimmerLoadComponent,
        RoomViewComponent,
        SwitchLoadComponent,
        MotorLoadComponent,
        SceneTableComponent,
        SceneDetailsComponent,
        SceneActionCreateComponent,
        DimmerActionFormComponent,
        SwitchActionFormComponent,
        MotorActionFormComponent,
        ErrorMessageBarComponent,
        StopPropagationDirective,
        LoadCardHeaderComponent,
        SettingComponent,
        CreateSceneDialogComponent,
        DeleteSceneDialogComponent,
    ],
    imports: [
        BrowserModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule,
        NoopAnimationsModule,
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
