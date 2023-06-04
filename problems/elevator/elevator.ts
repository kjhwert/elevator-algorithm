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
      if (a.distance === b.distance) {
        return b.floor - a.floor;
      }

      return a.distance - b.distance;
    });

  const { distance, ...elevator } = minDistanceElevator;

  return elevator;
};

const elevator = {
  answer1,
};

export default elevator;
