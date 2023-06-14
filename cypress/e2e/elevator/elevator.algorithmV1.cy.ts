import Elevator from "../../../problems/elevator/Elevator";
import ElevatorSystem from "../../../problems/elevator/ElevatorSystem";

type ElevatorRequiredProps = Pick<Elevator, "floor"> &
  Partial<Pick<Elevator, "id" | "isBeingRepaired">>;

const loadElevatorSystem = (
  elevatorProps: ElevatorRequiredProps[]
): ElevatorSystem => {
  const elevators = elevatorProps.map(
    (elevators, index) =>
      new Elevator({
        id: index,
        floor: elevators.floor,
        isBeingRepaired: elevators.isBeingRepaired ?? false,
      })
  );

  return new ElevatorSystem(elevators);
};

/**
 * @docs 엘리베이터는 EV로 표기한다.
 */
describe("Question 1. EV를 호출했을 때 가장 가까운 EV가 호출되는 알고리즘", () => {
  context("손님이 있는 층에 EV가 있을 때", () => {
    it("손님은 1층, EV는 [1, 2] - 1층 EV 호출", () => {
      const guestFloor = 1;
      const elevatorSystem = loadElevatorSystem([{ floor: 1 }, { floor: 2 }]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(1);
    });
    it("손님은 1층, EV는 [1, 2] - 1층의 EV가 점검 중일 때 2층의 EV 호출", () => {
      const guestFloor = 1;
      const elevatorSystem = loadElevatorSystem([
        { floor: 1, isBeingRepaired: true },
        { floor: 2 },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(2);
    });

    it("손님은 30층, EV는 [28, 29] - 29층 EV 호출", () => {
      const guestFloor = 30;
      const elevatorSystem = loadElevatorSystem([{ floor: 28 }, { floor: 29 }]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(29);
    });
    it("손님은 30층, EV는 [28, 29] - 29층 EV가 점검 중일 때 28층 EV 호출", () => {
      const guestFloor = 30;
      const elevatorSystem = loadElevatorSystem([
        { floor: 28 },
        { floor: 29, isBeingRepaired: true },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(28);
    });
  });
  context("손님이 있는 층보다 위에 있는 EV가 가까울 때", () => {
    it("손님은 10층, EV는 [5, 12, 13] - 12층 EV 호출", () => {
      const guestFloor = 10;
      const elevatorSystem = loadElevatorSystem([
        { floor: 5 },
        { floor: 12 },
        { floor: 13 },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(12);
    });
    it("손님은 10층, EV는 [5, 12, 13] - 12층 EV가 점검 중일 때 5층 EV 호출", () => {
      const guestFloor = 10;
      const elevatorSystem = loadElevatorSystem([
        { floor: 5 },
        { floor: 12, isBeingRepaired: true },
        { floor: 13 },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(13);
    });
  });
  context("손님이 있는 층보다 아래에 있는 EV가 가까울 때", () => {
    it("손님은 10층, EV는 [7, 8, 15] - 8층 EV 호출", () => {
      const guestFloor = 10;
      const elevatorSystem = loadElevatorSystem([
        { floor: 7 },
        { floor: 8 },
        { floor: 15 },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(8);
    });
    it("손님은 10층, EV는 [7, 8, 15] - 8층 EV가 점검 중일 때 7층 EV 호출", () => {
      const guestFloor = 10;
      const elevatorSystem = loadElevatorSystem([
        { floor: 7 },
        { floor: 8, isBeingRepaired: true },
        { floor: 15 },
      ]);

      const elevator = elevatorSystem.callElevator(guestFloor);

      expect(elevator.floor).eq(7);
    });
  });
  context("손님과 동일한 거리의 EV가 여러대일 때", () => {
    context("EV가 손님과 같은 층일 때", () => {
      it("손님은 10층, EV는 [10, 10, 10] - index 0 EV 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 10 },
          { floor: 10 },
          { floor: 10 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.id).eq(0);
      });
      it("손님은 10층, EV는 [10, 10, 10] - index 0 점검 중일 때 index 1 EV 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 10, isBeingRepaired: true },
          { floor: 10 },
          { floor: 10 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.id).eq(1);
      });
      it("손님은 10층, EV는 [10, 10, 10] - index [0, 1] 점검 중일 때 index 2 EV 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 10, isBeingRepaired: true },
          { floor: 10, isBeingRepaired: true },
          { floor: 10 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.id).eq(2);
      });
    });
    context("EV가 손님과 다른 층일 때", () => {
      it("손님은 10층, EV는 [9, 11, 12] - 11층 EV 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 9 },
          { floor: 11 },
          { floor: 12 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.floor).eq(11);
      });
      it("손님은 10층, EV는 [9, 11, 12] - 11층 EV가 점검 중일 때 9층 EV 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 9 },
          { floor: 11, isBeingRepaired: true },
          { floor: 12 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.floor).eq(9);
      });
      it("손님은 10층, EV는 [9, 11, 11] - 11층 EV(index 1)가 점검 중일 때 11층 EV(index 2) 호출", () => {
        const guestFloor = 10;
        const elevatorSystem = loadElevatorSystem([
          { floor: 9 },
          { floor: 11, isBeingRepaired: true },
          { floor: 11 },
        ]);

        const elevator = elevatorSystem.callElevator(guestFloor);

        expect(elevator.id).eq(2);
      });
    });
  });
});
