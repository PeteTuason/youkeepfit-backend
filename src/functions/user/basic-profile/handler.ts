import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { BasicProfileDTO } from 'src/models/user';

const basicProfile: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, age, gender, height, weight, goalWeight, bmi, goal } = event.body as BasicProfileDTO;

  if (!email) {
    return formatJSONResponse({
      status: "failed",
      error: "email is required."
    }, 400);
  }

  if (!age) {
    return formatJSONResponse({
      status: "failed",
      error: "age is required."
    }, 400);
  }

  if (!gender) {
    return formatJSONResponse({
      status: "failed",
      error: "gender is required."
    }, 400);
  }

  if (!height) {
    return formatJSONResponse({
      status: "failed",
      error: "height is required."
    }, 400);
  }

  if (!weight) {
    return formatJSONResponse({
      status: "failed",
      error: "weight is required."
    }, 400);
  }

  if (!goalWeight) {
    return formatJSONResponse({
      status: "failed",
      error: "goalWeight is required."
    }, 400);
  }

  if (!bmi) {
    return formatJSONResponse({
      status: "failed",
      error: "bmi is required."
    }, 400);
  }

  if (!goal) {
    return formatJSONResponse({
      status: "failed",
      error: "goal is required."
    }, 400);
  }

  const user = await DatabaseService.isExist(email);

  if (user) {
    return formatJSONResponse({
      status: 'failed',
      error: `user not found`
    }, 404);
  }

  await DatabaseService.basicProfile(event.body);

  return formatJSONResponse({
    status: "success",
    data: event.body,
  }, 200);
};

export const main = middyfy(basicProfile);
