export interface Elevator {
  id: number;
  floor: number;
  isBeingRepaired: boolean;
}

const algorithmV1 = (guestFloor: number, elevators: Elevator[]): Elevator => {
  const [minDistanceElevator] = elevators
    .filter((elevator) => !elevator.isBeingRepaired)
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

export default algorithmV1;
