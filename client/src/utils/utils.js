export const getLists = (heatMapData) => {
    const data = {};
    const x = [];
    const y = [];
    const timeStamp = [];
    heatMapData.forEach((el) => {
        if (el.objectId in data) {
            data[el.objectId].x.push(el.x);
            data[el.objectId].y.push(el.y);
            data[el.objectId].timeStamp.push(el.timeStamp);
        } else {
            data[el.objectId] = {
                x: [el.x],
                y: [el.y],
                timeStamp: [el.timeStamp],
            };
        }

        x.push(el.x);
        y.push(el.y);
        timeStamp.push(el.timeStamp);
    });
    return data;
};
