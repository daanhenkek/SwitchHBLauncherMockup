export function animate(type, duration, from, to, callback, callbackDone) {
    let startTime = Date.now();

    let easeFunction;
    switch (type) {
        case "easeInBounce":
            easeFunction = easeInBounce;
            break;

        case "easeOutBounce":
            easeFunction = easeOutBounce;
            break;

        case "easeInOutBounce":
            easeFunction = easeInOutBounce;
            break;

        case "easeInElastic":
            easeFunction = easeInElastic;
            break;

        case "easeOutElastic":
            easeFunction = easeOutElastic;
            break;

        case "easeInOutElastic":
            easeFunction = easeInOutElastic;
            break;

        case "easeLinear":
            easeFunction = easeLinear;
            break;

        default:
            return;
    }

    function step() {
        let nowTime = Date.now();
        //console.log(from, to, duration, nowTime, startTime, nowTime - startTime);
        if (nowTime - startTime >= duration) {
            clearInterval(interval);
            if (callbackDone)
                callbackDone();
        }

        let n = easeLinearHelper(from, to, easeFunction((nowTime - startTime) / duration));
        //console.log(n);
        callback(n);
    }

    let interval = setInterval(step, 1000 / 60);
}

export function easeInBounce(n) {
    return 1 - easeOutBounce(1 - n);
}

export function easeOutBounce(n) {
    if ( n < ( 1 / 2.75 ) ) {
        return 7.5625 * n * n;
    } else if ( n < ( 2 / 2.75 ) ) {
        return 7.5625 * ( n -= ( 1.5 / 2.75 ) ) * n + 0.75;
    } else if ( n < ( 2.5 / 2.75 ) ) {
        return 7.5625 * ( n -= ( 2.25 / 2.75 ) ) * n + 0.9375;
    } else {
        return 7.5625 * ( n -= ( 2.625 / 2.75 ) ) * n + 0.984375;
    }
}

export function easeInOutBounce(n) {
    if (n < .5)
        return easeInBounce(n * 2) * .5;
    return easeOutBounce(n * 2 - 1) * .5 + .5;
}

export function easeLinear(n) {
    return n;
}

export function easeLinearHelper(from, to, n) {
    //console.log(n);
    return (1 - n) * from + n * to;
}

export function easeInElastic(n) {
    let s, a = 0.1, p = 0.8;
    if ( n === 0 ) return 0;
    if ( n === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    return - ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
};

export function easeOutElastic(n) {
    let s, a = 0.1, p = 0.8;
    if ( n === 0 ) return 0;
    if ( n === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    return ( a * Math.pow( 2, - 10 * n) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) + 1 );
};

export function easeInOutElastic(n) {
    let s, a = 0.1, p = 0.8;
    if ( n === 0 ) return 0;
    if ( n === 1 ) return 1;
    if ( !a || a < 1 ) { a = 1; s = p / 4; }
    else s = p * Math.asin( 1 / a ) / ( 2 * Math.PI );
    if ( ( n *= 2 ) < 1 ) return - 0.5 * ( a * Math.pow( 2, 10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) );
    return a * Math.pow( 2, -10 * ( n -= 1 ) ) * Math.sin( ( n - s ) * ( 2 * Math.PI ) / p ) * 0.5 + 1;
};
