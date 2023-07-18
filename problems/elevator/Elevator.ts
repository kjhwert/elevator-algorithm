export interface ElevatorProps {
  id: number;
  floor: number;
  isBeingRepaired?: boolean;
  destinations?: number[];
}

class Elevator {
  id: number;
  floor: number;
  isBeingRepaired: boolean;
  destinations: number[];

  constructor(props: ElevatorProps) {
    this.id = props.id;
    this.floor = props.floor;
    this.isBeingRepaired = props.isBeingRepaired ?? false;
    this.destinations = props.destinations ?? [];
  }

  getArrivalTime = (guestFloor: number): number => {
    return Math.abs(guestFloor - this.floor);
  };

  addDestination = (destination: number) => {
    this.destinations.push(destination);
  };
}

export default Elevator;
