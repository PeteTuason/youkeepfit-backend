export default {
  type: "object",
  properties: {
    email: { type: 'string' },
    gymEquipments: { type: 'string' },
    workoutExperience: { type: 'string' },
    workoutTime: { type: 'string'}
  },
  required: [ 'email', 'gymEquipments', 'workoutExperience', 'workoutTime']
} as const;
