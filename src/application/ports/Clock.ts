export interface Clock {
    now(): Date;
}

export class SystemClock implements Clock {
    now(): Date {
        return new Date();
    }
}

export class LocalClock implements Clock {
    now(): Date {
        const utcNow = new Date();
        // UTC-5 adjustment (Colombia standard time, no DST)
        const colombiaTime = new Date(utcNow.getTime() - 5 * 60 * 60 * 1000);
        return colombiaTime;
    }
}
