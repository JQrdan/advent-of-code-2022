const { getInputString } = require("../utils/getInputString.js");

const parseInput = (file) => {
  const beacons = [];
  const sensors = [];

  for(const line of file.split('\n')) {
    const [sensorString, beaconString] = line.split(":");

    const [sx, sy] = sensorString.split("Sensor at ")[1].replace(/(x=|y=)/g, '').split(', ').map(val => parseInt(val));
    const [bx, by] = beaconString.split(" closest beacon is at ")[1].replace(/(x=|y=)/g, '').split(', ').map(val => parseInt(val));

    sensors.push([sx, sy])
    beacons.push([bx, by])
  }

  return {
    sensors, beacons
  }
}

const getDistanceBetween = (sensor, beacon) => {
  const [sx, sy] = sensor;
  const [bx, by] = beacon;

  const dx = Math.abs(sx - bx);
  const dy = Math.abs(sy - by);

  return dx + dy;
}

const getMinMaxX = (sensors, beacons) => {
  let minX = 0;
  let maxX = 0
  for(let i = 0; i < sensors.length; i++) {
    const [sx, sy] = sensors[i];
    const beacon = beacons[i];

    const radius = getDistanceBetween([sx, sy], beacon);

    if(sx - radius < minX) {
      minX = sx - radius;
    }
    if(sx + radius > maxX) {
      maxX = sx + radius;
    }
  }

  return {
    minX,
    maxX
  }
}

const Run = (y) => {
  const file = getInputString(15, false);

  const {sensors, beacons} = parseInput(file);

  const {minX, maxX} = getMinMaxX(sensors, beacons);

  /*
    The trick here is to check if the distance between each cell and every sensor
    is less than the distance between that sensor and its beacon
  */
  let counter = 0;
  for(let x = minX; x <= maxX; x++) {
    const posToCheck = [x, y];

    let within = false;
    for(let i = 0; i < sensors.length; i++) {

      /*
        For some reason spaces occupied by a sensor or a beacon don't count as being 'invalid'
      */
      const [sx, sy] = sensors[i]
      const [bx, by] = beacons[i]
      if((sx === x && sy === y) || (bx === x && by === y)) {
        continue
      }

      const radius = getDistanceBetween(sensors[i], beacons[i]);
      if(getDistanceBetween(sensors[i], posToCheck) <= radius) {
        within = true;
        break;
      }
    }
    if(within) {
      counter++
    }
  }

  console.log(counter)
}

Run(2000000);
