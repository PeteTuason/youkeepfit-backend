export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    bodyType: { type: 'string' },
    activityLevel: { type: 'string' },
    healthQuestions: { type: 'array' },
  },
  required: ['email', 'bodyType', 'activityLevel', 'healthQuestions']
} as const;
