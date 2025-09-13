/**
 * Simple test to verify Jest setup
 */

describe('Jest Setup Test', () => {
  it('should run basic test', () => {
    expect(1 + 1).toBe(2);
  });

  it('should handle strings', () => {
    expect('Hello World').toContain('World');
  });

  it('should handle arrays', () => {
    const fruits = ['apple', 'banana', 'orange'];
    expect(fruits).toHaveLength(3);
    expect(fruits).toContain('banana');
  });
});