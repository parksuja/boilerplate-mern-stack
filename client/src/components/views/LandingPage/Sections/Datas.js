const continents = [
  {
    _id: 1,
    name: "헬스1",
  },
  {
    _id: 2,
    name: "헬스2",
  },
  {
    _id: 3,
    name: "헬스3",
  },
  {
    _id: 4,
    name: "헬스4",
  },
  {
    _id: 5,
    name: "헬스5",
  },
  {
    _id: 6,
    name: "헬스6",
  },
  {
    _id: 7,
    name: "헬스7",
  },
];

const price = [
  {
    _id: 0,
    name: "모든 값",
    array: [],
  },
  {
    _id: 1,
    name: "0 ~ 9999원이하",
    array: [0, 9999],
  },
  {
    _id: 2,
    name: "10000 ~ 29999원이하",
    array: [10000, 29999],
  },
  {
    _id: 3,
    name: "30000 ~ 49999원이하",
    array: [30000, 49999],
  },
  {
    _id: 4,
    name: "50000 ~ 69999원이하",
    array: [50000, 69999],
  },
  {
    _id: 5,
    name: "70000이상",
    array: [70000, 1000000],
  },
];

export { continents, price };
