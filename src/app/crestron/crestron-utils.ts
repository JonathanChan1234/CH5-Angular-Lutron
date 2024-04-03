declare var CrComLib: any;

export function pulse(joinNumber: number): void {
    if (!joinNumber) return;
    console.log(`pulse join number ${joinNumber}`);
    CrComLib.publishEvent('b', joinNumber.toString(), true);
    setTimeout(() => {
        CrComLib.publishEvent('b', joinNumber.toString(), false);
    }, 1000);
}
