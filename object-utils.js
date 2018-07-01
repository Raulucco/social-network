module.exports = {
    get = (obj, prop) => prop.split('.').reduce((acc, current) => acc[current], obj),
    set = (obj, prop, value) => {
        const props = props.split('.');
        const path = props.reverse().reduce((acc, current) => ({
            [current]: acc[current] || acc
        }), {
            [props[props.length - 1]]: value
        });

        return {
            ...obj,
            ...path
        };
    },
    parseFlatToTree = (obj) => Object.entries(obj).reduce((acc, entry) => set.apply(null, [acc, ...entry]), {})
}