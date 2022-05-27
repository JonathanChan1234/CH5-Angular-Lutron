import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

declare var CrComLib: any;

@Injectable({
    providedIn: 'root',
})
export class LogService {
    logger: any;

    constructor() {
        const appendar = CrComLib.getRemoteAppender(
            environment.remoteLoggerIP,
            environment.remoteLoggerPort
        );
        this.logger = CrComLib.getLogger(appendar, true);
    }

    log(msg: string) {
        console.log(`From Logger service, ${msg}`);
        this.logger.subscribeDockerStatus.subscribe((message) => {
            console.log(message);
        });
    }
}
