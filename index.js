import Config from 'react-native-config';

function isNumber(n) {
    return !isNaN(parseFloat(n)) && isFinite(n);
}

const configProxyHandler = {
    get: function (target, prop, receiver) {
        const envValue = Config[prop];

        // Check if boolean and converts
        if (envValue === 'true')
            return true;
        else if (envValue === 'false')
            return false;

        // Check if number and converts
        else if (isNumber(envValue))
            return parseFloat(envValue);

        // String otherwise
        else
            return envValue;
    }
};


export default new Proxy({}, configProxyHandler);