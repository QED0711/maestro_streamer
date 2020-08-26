
const parseQueryString = (queryString) => {
    // parse query string
    const params = new URLSearchParams(queryString);

    const obj = {};

    // iterate over all keys
    let val;
    for (const key of params.keys()) {
        if (params.getAll(key).length > 1) {
            val = params.getAll(key);
        } else {
            val = params.get(key);
        }

        if(val === "false") val = false;
        if(val === "true") val = true;

        obj[key] = val
    }
    return obj
}



export default parseQueryString