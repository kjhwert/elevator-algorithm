import elevator, { Elevator } from "../../../problems/elevator/elevator";

const getElevators = (floors: number[]): Elevator[] => {
  let index = 0;

  return floors.map((floor) => ({
    id: index++,
    floor,
  }));
};

describe("엘리베이터 알고리즘", () => {
  describe("Question 1. 엘리베이터를 호출했을 때 가장 가까운 엘리베이터가 호출되는 알고리즘", () => {
    context("손님이 10층일 때", () => {
      const guestFloor = 10;

      it("손님이 있는 층에 엘리베이터가 있는 경우 해당 엘리베이터가 호출된다.", () => {
        const elevatorFloors = [1, 5, 10, 15, 20];

        const answer = elevator.answer1(
          guestFloor,
          getElevators(elevatorFloors)
        );

        expect(answer.floor).eq(10);
      });
      it("손님이 있는 층보다 위에 있는 엘리베이터가 더 가까운 경우 위의 엘리베이터가 호출된다.", () => {
        const elevatorFloors = [1, 5, 11, 20, 25];

        const answer = elevator.answer1(
          guestFloor,
          getElevators(elevatorFloors)
        );

        expect(answer.floor).eq(11);
      });
      it("손님이 있는 층보다 아래에 있는 엘리베이터가 더 가까운 경우 아래 엘리베이터가 호출된다.", () => {
        const elevatorFloors = [1, 5, 8, 15, 20];

        const answer = elevator.answer1(
          guestFloor,
          getElevators(elevatorFloors)
        );

        expect(answer.floor).eq(8);
      });
      it("가까이에 있는 엘리베이터가 같은 거리에 있는 경우 위에 있는 엘리베이터가 호출된다.", () => {
        const elevatorFloors = [1, 5, 15, 20];

        const answer = elevator.answer1(
          guestFloor,
          getElevators(elevatorFloors)
        );

        expect(answer.floor).eq(15);
      });
      it("모든 엘리베이터가 같은 층에 있는 경우 고유번호(id)가 낮은 엘리베이터가 우선 호출된다.", () => {
        const elevatorFloors = [20, 20, 20, 20, 20];

        const answer = elevator.answer1(
          guestFloor,
          getElevators(elevatorFloors)
        );

        expect(answer.id).eq(0);
      });
    });
  });
});
