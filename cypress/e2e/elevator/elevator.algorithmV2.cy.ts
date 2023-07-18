import Elevator from "../../../problems/elevator/Elevator";
import ElevatorSystem from "../../../problems/elevator/ElevatorSystem";

type ElevatorRequiredProps = Pick<Elevator, "floor">;

const loadElevatorSystem = (
  elevatorProps: ElevatorRequiredProps[]
): ElevatorSystem => {
  const elevators = elevatorProps.map(
    (elevators, index) =>
      new Elevator({
        id: index,
        floor: elevators.floor,
      })
  );

  return new ElevatorSystem(elevators);
};

describe("Question 2. 손님이 목적지를 향해 가고있는 엘리베이터를 호출했을 때 가장 빨리 도착할 수 있는 엘리베이터를 호출하는 알고리즘", () => {
  context("엘리베이터를 10층에서 호출하면", () => {
    let elevatorSystem: ElevatorSystem;
    beforeEach(() => {
      elevatorSystem = loadElevatorSystem([{ floor: 0 }]);
      elevatorSystem.callElevator(10);
    });

    it("엘리베이터에 목적지가 추가된다.", () => {
      const elevator = elevatorSystem.getSelectedElevator();

      expect(elevator.getDestinations().toString()).eq([10].toString());
    });
    it("엘리베이터 시스템에 해당 엘리베이터의 정보를 확인할 수 있다.", () => {
      const elevator = elevatorSystem.getSelectedElevator();

      expect(elevator.id).eq(0);
      expect(elevator.floor).eq(0);
      expect(elevator.isBeingRepaired).eq(false);
    });
  });

  context("엘리베이터가 목적지까지 도달하려면", () => {
    context("다른 목적지가 없을 때", () => {
      it("0층에서 5층까지는 15초 걸린다.", () => {
        const guestFloor = 5;
        const elevator = new Elevator({ id: 0, floor: 0 });

        expect(elevator.getArrivalTime(guestFloor)).eq(15);
      });
      it("30층에서 25층까지는 15초 걸린다.", () => {
        const guestFloor = 25;
        const elevator = new Elevator({ id: 0, floor: 30 });

        expect(elevator.getArrivalTime(guestFloor)).eq(15);
      });
      it("0층에서 10층까지는 30초 걸린다.", () => {
        const guestFloor = 10;
        const elevator = new Elevator({ id: 0, floor: 0 });

        expect(elevator.getArrivalTime(guestFloor)).eq(30);
      });
      it("30층에서 20층까지는 30초 걸린다.", () => {
        const guestFloor = 20;
        const elevator = new Elevator({ id: 0, floor: 30 });

        expect(elevator.getArrivalTime(guestFloor)).eq(30);
      });
    });
  });
});
