export const isOffChainProperty = (name: string, offChainProps: any): boolean => {
    for (const offChainPropName of Object.keys(offChainProps)) {
        if (offChainPropName === name) {
            return true;
        }
    }

    return false;
};

export const getOffChainText = (name: string, offChainProps: any): string => {
    return isOffChainProperty(name, offChainProps) ? ' (private)' : '';
};

export function dataTest(value, name = 'data-test') {
    return {
        [name]: value
    };
}

export function dataTestSelector(value, name = 'data-test') {
    return `[${name}="${value}"]`;
}

export function getPropertyByPath(obj, path) {
    return path.split('.').reduce((prev, curr) => {
        return prev ? prev[curr] : null;
    }, obj || self);
}

export function indexOfEnd(baseString: string, searchString: string) {
    const index = baseString.indexOf(searchString);

    return index === -1 ? -1 : index + searchString.length;
}

export function deepEqual(a: any, b: any) {
    if (typeof a !== typeof b) {
        return false;
    }

    if (typeof a === 'object') {
        return JSON.stringify(a) === JSON.stringify(b);
    }

    return a === b;
}

export function getEnumValues(enumeration) {
    const enumObject = Object.keys(enumeration);

    return enumObject.splice(Math.ceil(enumObject.length / 2), enumObject.length - 1);
}

const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD'
});

export function formatCurrency(value: number) {
    return currencyFormatter.format(value).replace('$', '');
}

interface IEnvironment {
    MODE: string;
    BACKEND_URL: string;
    BLOCKCHAIN_EXPLORER_URL: string;
    WEB3: string;
}

export function getEnv(): IEnvironment {
    return (
        // eslint-disable-next-line dot-notation
        window['_env_'] || {
            MODE: 'development',
            BACKEND_URL: 'http://localhost:3030',
            BLOCKCHAIN_EXPLORER_URL: 'https://volta-explorer.energyweb.org',
            WEB3: 'http://localhost:8545'
        }
    );
}

export function deduplicate(inputArray: any[]) {
    return inputArray.filter(
        (item, index, array) =>
            array.map(nestedItem => JSON.stringify(nestedItem)).indexOf(JSON.stringify(item)) ===
            index
    );
}

export function reverse(array: any[]) {
    return array.map((item, idx) => array[array.length - 1 - idx]);
}
