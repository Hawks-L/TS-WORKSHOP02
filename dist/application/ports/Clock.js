"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LocalClock = exports.SystemClock = void 0;
class SystemClock {
    now() {
        return new Date();
    }
}
exports.SystemClock = SystemClock;
class LocalClock {
    now() {
        const utcNow = new Date();
        // UTC-5 adjustment (Colombia standard time, no DST)
        const colombiaTime = new Date(utcNow.getTime() - 5 * 60 * 60 * 1000);
        return colombiaTime;
    }
}
exports.LocalClock = LocalClock;
