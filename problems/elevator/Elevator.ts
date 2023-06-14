export interface ElevatorProps {
  id: number;
  floor: number;
  isBeingRepaired?: boolean;
}

class Elevator {
  id: number;
  floor: number;
  isBeingRepaired: boolean;

  constructor(props: ElevatorProps) {
    this.id = props.id;
    this.floor = props.floor;
    this.isBeingRepaired = props.isBeingRepaired ?? false;
  }

  getArrivalTime = (guestFloor: number): number => {
    return Math.abs(guestFloor - this.floor);
  };
}

export default Elevator;
