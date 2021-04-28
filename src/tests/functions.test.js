import HelperFunctions from '../functions';

describe('Tests for score convertion', () => {
  it('Checks if seconds has a prefix of 0 if seconds are a single digit', async () => {
    const time = HelperFunctions.convertScoreToTime(5);
    expect(time).toBe('00:05');
  });
  it('Checks if seconds has no prefix of 0 if seconds are double digits', async () => {
    const time = HelperFunctions.convertScoreToTime(15);
    expect(time).toBe('00:15');
  });
  it('Checks if minutes has a prefix of 0 if minutes are a single digit', async () => {
    const time = HelperFunctions.convertScoreToTime(65);
    expect(time).toBe('01:05');
  });
  it('Checks if minutes has no prefix of 0 if minutes are double digits', async () => {
    const time = HelperFunctions.convertScoreToTime(630);
    expect(time).toBe('10:30');
  });
});

describe('Tests for distance summation', () => {
  it('Checks if sum is 7', async () => {
    const sum = HelperFunctions.calculateSum(5,2);
    expect(sum).toBe(7);
  });
  it('Ensures sum is not 2', async () => {
    const sum = HelperFunctions.calculateSum(5,2);
    expect(sum).not.toBe(2);
  });
  it('Checks if sum is 1', async () => {
    const sum = HelperFunctions.calculateSum(-2,3);
    expect(sum).toBe(1);
  });
  it('Ensures difference is not -2', async () => {
    const sum = HelperFunctions.calculateSum(-2,3);
    expect(sum).not.toBe(-2);
  });
});

describe('Tests for distance difference', () => {
  it('Checks if difference is 3', async () => {
    const diff = HelperFunctions.calculateDifference(5,2);
    expect(diff).toBe(3);
  });
  it('Ensures difference is not 2', async () => {
    const diff = HelperFunctions.calculateDifference(5,2);
    expect(diff).not.toBe(2);
  });
  it('Checks if difference is -5', async () => {
    const diff = HelperFunctions.calculateDifference(-2,3);
    expect(diff).toBe(-5);
  });
  it('Ensures difference is not -2', async () => {
    const diff = HelperFunctions.calculateDifference(-2,3);
    expect(diff).not.toBe(-2);
  });
});
