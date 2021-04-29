import { getScores } from '../score';

global.fetch = jest.fn(() => Promise.resolve({
  json: () => Promise.resolve([{ name: 'Emma', score: 360 }, { name: 'John', score: 200 }]),
}));

it('Checks if API returns Array', async () => {
  const scores = await getScores();
  expect(scores).toBeInstanceOf(Array);
});
it('Checks if API returns Object', async () => {
  const scores = await getScores();
  expect(scores).toBeInstanceOf(Object);
});
it('Ensures API does not return Number', async () => {
  const scores = await getScores();
  expect(scores).not.toBeInstanceOf(Number);
});
it('Ensures API does not return String', async () => {
  const scores = await getScores();
  expect(scores).not.toBeInstanceOf(String);
});
it('Checks if first element is Object', async () => {
  const scores = await getScores();
  expect(scores[0]).toBeInstanceOf(Object);
});
it('Ensures first element is not an Array', async () => {
  const scores = await getScores();
  expect(scores[0]).not.toBeInstanceOf(Array);
});
it('Ensures first element is not a String', async () => {
  const scores = await getScores();
  expect(scores[0]).not.toBeInstanceOf(String);
});
it('Ensures first element is not a Number', async () => {
  const scores = await getScores();
  expect(scores[0]).not.toBeInstanceOf(Number);
});
it("Checks if first element's name is Emma", async () => {
  const scores = await getScores();
  expect(scores[0].name).toBe('Emma');
});
it("Ensures first element's name is not John", async () => {
  const scores = await getScores();
  expect(scores[0].name).not.toBe('John');
});
it("Checks if first element's score is 360", async () => {
  const scores = await getScores();
  expect(scores[0].score).toBe(360);
});
it("Ensures first element's score is not 400", async () => {
  const scores = await getScores();
  expect(scores[0].score).not.toBe(400);
});
it("Ensures returned array's length is 2", async () => {
  const scores = await getScores();
  expect(scores.length).toBe(2);
});
it("Ensures returned array's length is not 1", async () => {
  const scores = await getScores();
  expect(scores.length).not.toBe(1);
});