import Elevator from "./Elevator";

class ElevatorSystem {
  #elevators: Elevator[];
  selectedElevator: Elevator | null = null;

  constructor(elevators: Elevator[]) {
    this.#elevators = elevators;
  }

  callElevator = (guestFloor: number) => {
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

    closestElevator.addDestination(guestFloor);
    this.selectedElevator = closestElevator;
  };

  getSelectedElevator = (): Elevator => this.selectedElevator;
}

export default ElevatorSystem;
