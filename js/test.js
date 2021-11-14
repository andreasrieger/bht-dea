const table = (result) => {
    var arr = [];
    Object.entries(result).map(item => {
        arr.push(Object.values(item[1]));
    })
    return arr;
};

(() => {
    const response = [{
        0: 0,
        1: "B",
        2: 1
    }, {
        0: 1,
        1: "P",
        2: 3
    }];
    console.log(table(response));
})();