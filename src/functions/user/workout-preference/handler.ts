import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { WorkoutPreferenceDTO } from 'src/models/user';

const workoutPreference: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, gymEquipments, workoutExperience, workoutTime } = event.body as WorkoutPreferenceDTO;

  if (!email) {
    return formatJSONResponse({
      status: "failed",
      error: "email is required."
    }, 400);
  }

  if (!gymEquipments) {
    return formatJSONResponse({
      status: "failed",
      error: "gymEquipments is required."
    }, 400);
  }

  if (!workoutExperience) {
    return formatJSONResponse({
      status: "failed",
      error: "workoutExperience is required."
    }, 400);
  }

  if (!workoutTime) {
    return formatJSONResponse({
      status: "failed",
      error: "workoutTime is required."
    }, 400);
  }

  const user = await DatabaseService.isExist(email);

  if (user) {
    return formatJSONResponse({
      status: 'failed',
      error: `user not found`
    }, 404);
  }

  await DatabaseService.workoutPreference(event.body);

  return formatJSONResponse({
    status: "success",
    data: event.body,
  }, 200);
};

export const main = middyfy(workoutPreference);
