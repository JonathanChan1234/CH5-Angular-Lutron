import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

declare var CrComLib: any;

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch((err) => console.error(err));

if (!environment.production) {
    const ch5Emulator = CrComLib.Ch5Emulator.getInstance();
    const scenario = { cues: [], onStart: [] };
    ch5Emulator.loadScenario(scenario);
    ch5Emulator.run();
}

if (environment.production) {
    const appendar = CrComLib.getRemoteAppender(
        environment.remoteLoggerIP,
        environment.remoteLoggerPort
    );
    const logger = CrComLib.getLogger(appendar, true);
    logger.subscribeDockerStatus.subscribe((message: string) => {
        console.log(message);
    });
}
