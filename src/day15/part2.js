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

const Run = () => {
  const file = getInputString(15, false);

  const {sensors, beacons} = parseInput(file);

  const minXY = 0;
  const maxXY = 4000000;

  const pCoeffs = []
  const nCoeffs = []

  const raiduses = [];
  for(let i = 0; i < sensors.length; i++) {
    const [x, y] = sensors[i];

    const radius = getDistanceBetween(sensors[i], beacons[i]);
    raiduses.push(radius)
    
    pCoeffs.push(y-x+radius+1)
    pCoeffs.push(y-x+radius-1)

    nCoeffs.push(x+y+radius+1)
    nCoeffs.push(x+y+radius-1)
  }

  /*
    Stole a trick from reddit where the only positions you need to check
    are ones where the lines from the sensor boundaries intersect
  */

  let location;
  for(const a of pCoeffs) {
    for(const b of nCoeffs) {
      const posToCheck = [Math.floor((b-a)/2), Math.floor((a+b)/2)]
      if(posToCheck[0] > minXY && posToCheck[0] < maxXY && posToCheck[1] > minXY && posToCheck[1] < maxXY){
        let canPlace = true;
        for(let i = 0; i < sensors.length; i++) {
          const radius = getDistanceBetween(sensors[i], beacons[i]);
          if(getDistanceBetween(sensors[i], posToCheck) <= radius) {
            canPlace = false;
            break;
          }
        }
        if(canPlace) {
          location = posToCheck;
          break;
        }
      }
    }
  }

  console.log(location)
  const result = (location[0] * 4000000) + location[1];
  console.log(result)
}

Run();
