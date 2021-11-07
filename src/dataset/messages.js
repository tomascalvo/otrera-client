import moment from 'moment'

const messages = [
  {
    sender: { _id: "6159aa2f359e0939ac94aeb5", name: "Katya Zamolodchikova" },
    text: "let's exercise together",
    createdAt: moment().subtract(60, "minutes").toDate(),
  },
  {
    sender: { _id: "6159aa04359e0939ac94aeb3", name: "Trixie Mattel" },
    text: "ok I'm ready",
    createdAt: moment().subtract(59, "minutes").toDate(),
  },
  {
    sender: { _id: "611c0e0011f0c449b0000f56", name: "Diego Calvo" },
    text: "how should we warm up?",
    createdAt: moment().subtract(58, "minutes").toDate(),
  },
  {
    sender: { _id: "611ad7ae31690245d8dec0a7", name: "Tomás Calvo" },
    text: "duck walk",
    createdAt: moment().subtract(57, "minutes").toDate(),
  },
  {
    sender: { _id: "6159aa04359e0939ac94aeb3", name: "Trixie Mattel" },
    text: "I'm too hungover for duck walk",
    createdAt: moment().subtract(56, "minutes").toDate(),
  },
  {
    sender: { _id: "611ad7ae31690245d8dec0a7", name: "Tomás Calvo" },
    text: "ok death drops",
    createdAt: moment().subtract(55, "minutes").toDate(),
  },
  {
    sender: { _id: "6159aa04359e0939ac94aeb3", name: "Trixie Mattel" },
    text: "fine",
    createdAt: moment().subtract(54, "minutes").toDate(),
  },
];

export default messages;