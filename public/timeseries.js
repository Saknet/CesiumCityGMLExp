function getTimeseries(sensors) {
    let firstTime = Number.MAX_VALUE;
    let lastTime = 0;

    for (let i = 0; i < sensors.sensors.length; i++) {
        let data = JSON.parse(sensors.sensors[i].sensordata);
        for (let j = 0; j < data.timeseries.length; j++) {
            if (data.timeseries[j].time < firstTime) {
                firstTime = data.timeseries[j].time;
            } 
            if (data.timeseries[j].time > lastTime) {
                lastTime = data.timeseries[j].time;
            } 
        }
    }

    let middleTime = lastTime - ((lastTime - firstTime) / 2);

    let timeseries = new Object();
    timeseries.firstTime = firstTime;
    timeseries.lastTime = lastTime;
    timeseries.middleTime = middleTime;
    timeseries.secondTime = middleTime - ((lastTime - firstTime) / 4);
    timeseries.fourthTime = lastTime - ((lastTime - firstTime) / 4);

    return timeseries;

}

function parsetime(lastTime) {
    let year = lastTime.substring(0, 4);
    let month = lastTime.substring(4, 6);
    let day = lastTime.substring(6, 8);
    let hours = lastTime.substring(8, 10);
    let minutes = lastTime.substring(10, 12);
    let seconds = lastTime.substring(12, 14);
    let ms = lastTime.substring(15, 17);

    let realTimes = new Object();

    let latest = new Date(Date.UTC(year, month, day, hours, minutes, seconds, ms));
    let fifthTime = latest.getTime();
    let thirtyMinutes = 30 * 60 * 1000;
    let fourthTime = fifthTime - thirtyMinutes;
    let thirdTime = fourthTime - thirtyMinutes;
    let secondTime = thirdTime - thirtyMinutes;
    let firstTime = secondTime - thirtyMinutes;

    realTimes.fifth = new Date(fifthTime).toLocaleString();
    realTimes.fourth = new Date(fourthTime).toLocaleString();
    realTimes.third = new Date(thirdTime).toLocaleString();
    realTimes.second = new Date(secondTime).toLocaleString();
    realTimes.first = new Date(firstTime).toLocaleString();

    return realTimes;
  }