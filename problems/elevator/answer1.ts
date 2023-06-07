export interface Elevator {
  id: number;
  floor: number;
}

const answer1 = (guestFloor: number, elevators: Elevator[]): Elevator => {
  const [minDistanceElevator] = elevators
    .map((elevator) => ({
      ...elevator,
      distance: Math.abs(guestFloor - elevator.floor),
    }))
    .sort((a, b) => {
      // 엘리베이터의 거리가 동일한 경우 위에 있는 엘리베이터 호출
      if (a.distance === b.distance) {
        return b.floor - a.floor;
      }

      return a.distance - b.distance;
    });

  const { distance, ...elevator } = minDistanceElevator;

  return elevator;
};

export default answer1;
