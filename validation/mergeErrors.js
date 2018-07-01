module.exports = (...args) => [...args].reduce((acc, current) => {
    Object.getOwnPropertyNames(current).forEach(key => {
        // do not use set as this object should be flat
        acc[key] = isEmpty(acc[key]) ? current[key] : [...acc[key], ...current[key]];
    });
    return acc;
}, {});