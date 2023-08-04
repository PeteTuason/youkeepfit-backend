export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    dietType: { type: 'string' },
    numberOfMeals: { type: 'number' }
  },
  required: [ 'email', 'dietType', 'numberOfMeals']
} as const;
