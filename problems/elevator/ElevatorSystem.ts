import Elevator from "./Elevator";

class ElevatorSystem {
  #elevators: Elevator[];

  constructor(elevators: Elevator[]) {
    this.#elevators = elevators;
  }

  callElevator = (guestFloor: number): Elevator => {
    const [closestElevator] = this.#elevators
      .filter((elevator) => !elevator.isBeingRepaired)
      .sort((a, b) => {
        const aArrivalTime = a.getArrivalTime(guestFloor);
        const bArrivalTime = b.getArrivalTime(guestFloor);

        if (aArrivalTime === bArrivalTime) {
          return b.floor - a.floor;
        }

        return aArrivalTime - bArrivalTime;
      });

    return closestElevator;
  };
}

export default ElevatorSystem;
