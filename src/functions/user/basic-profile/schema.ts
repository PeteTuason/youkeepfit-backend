export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    age: { type: 'number' },
    gender: { type: 'string' },
    height: { type: 'number' },
    weight: { type: 'number' },
    goalWeight: { type: 'number' },
    bmi: { type: 'number' },
    goal: { type: 'string' }
  },
  required: [ 'email', 'age', 'gender', 'height', 'weight', 'goalWeight', 'bmi', 'goal']
} as const;
