import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { FitnessProfileDTO } from 'src/models/user';

const fitnessProfile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, bodyType, activityLevel, healthQuestions } = event.body as FitnessProfileDTO;

  if (!email) {
    return formatJSONResponse({
      status: "failed",
      error: "email is required."
    }, 400);
  }

  if (!bodyType) {
    return formatJSONResponse({
      status: "failed",
      error: "bodyType is required."
    }, 400);
  }

  if (!activityLevel) {
    return formatJSONResponse({
      status: "failed",
      error: "activityLevel is required."
    }, 400);
  }

  if (!healthQuestions) {
    return formatJSONResponse({
      status: "failed",
      error: "healthQuestions is required."
    }, 400);
  }

  const user = await DatabaseService.isExist(email);

  if (user) {
    return formatJSONResponse({
      status: 'failed',
      error: `another user is already using the email ${email}`
    }, 400);
  }

  await DatabaseService.fitnessProfile(event.body);

  return formatJSONResponse({
    status: "success",
    data: event.body,
  }, 200);
};

export const main = middyfy(fitnessProfile);
