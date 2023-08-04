import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { DietPreferenceDTO } from 'src/models/user';

const dietPreference: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, dietType, numberOfMeals } = event.body as DietPreferenceDTO;

  if (!email) {
    return formatJSONResponse({
      status: "failed",
      error: "email is required."
    }, 400);
  }

  if (!dietType) {
    return formatJSONResponse({
      status: "failed",
      error: "dietType is required."
    }, 400);
  }

  if (!numberOfMeals) {
    return formatJSONResponse({
      status: "failed",
      error: "numberOfMeals is required."
    }, 400);
  }

  const user = await DatabaseService.isExist(email);

  if (user) {
    return formatJSONResponse({
      status: 'failed',
      error: `user not found`
    }, 404);
  }

  await DatabaseService.dietPreference(event.body);

  return formatJSONResponse({
    status: "success",
    data: event.body,
  }, 200);
};

export const main = middyfy(dietPreference);
