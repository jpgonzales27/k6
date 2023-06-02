module.exports = {
  types: {
    smoke_test: {
      vus: 1,
      duration: "10s",
    },
    load_test: {
      stages: [
        { duration: "10s", target: 5 },
        { duration: "10s", target: 5 },
        { duration: "10s", target: 20 },
        { duration: "10s", target: 20 },
        { duration: "10s", target: 0 },
      ],
    },
    stress_test: {
      stages: [
        { duration: "10s", target: 50 },
        { duration: "10s", target: 50 },
        { duration: "10s", target: 100 },
        { duration: "10s", target: 100 },
        { duration: "10s", target: 200 },
        { duration: "10s", target: 200 },
        { duration: "10s", target: 0 },
      ],
    },
  },
};
