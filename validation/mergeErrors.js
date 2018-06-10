module.exports = (...args) => [...args].reduce((acc, current) => {
    Object.getOwnPropertyNames(current).forEach(key => {
        acc[key] = isEmpty(acc[key]) ? current[key] : [...acc[key], ...current[key]];
    });
    return acc;
}, {});