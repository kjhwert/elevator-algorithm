export interface ElevatorProps {
  id: number;
  floor: number;
  isBeingRepaired?: boolean;
  destinations?: number[];
}

const FLOOR_HEIGHT = 3; // 단위: m

class Elevator {
  static ELEVATOR_SPEED = 1; // 단위: m/s

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
    if (this.hasDestination()) {
      /**
       * TODO 목적지가 있는 경우에는, 해당 목적지에 갔다가 guestFloor에 오는 시간을 계산해야한다.
       */
      return (
        Math.abs(this.destinations[0] - this.floor) *
        FLOOR_HEIGHT *
        Elevator.ELEVATOR_SPEED
      );
    }

    return (
      Math.abs(guestFloor - this.floor) * FLOOR_HEIGHT * Elevator.ELEVATOR_SPEED
    );
  };

  hasDestination = () => this.destinations.length > 0;

  getDestinations = () => this.destinations;

  addDestination = (destination: number) => {
    this.destinations.push(destination);
  };
}

export default Elevator;
