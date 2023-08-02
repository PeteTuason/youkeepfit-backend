import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { RegisterDTO } from 'src/models/user';

const register: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { firstname, lastname, email, password, role } = event.body as RegisterDTO;

  if (!firstname) {
    return formatJSONResponse({
      status: "failed",
      error: "firstname is required."
    }, 400);
  }

  if (!lastname) {
    return formatJSONResponse({
      status: "failed",
      error: "lastname is required."
    }, 400);
  }

  if (!email) {
    return formatJSONResponse({
      status: "failed",
      error: "email is required."
    }, 400);
  }

  if (!password) {
    return formatJSONResponse({
      status: "failed",
      error: "password is required."
    }, 400);
  }

  const user = await DatabaseService.isExist(email);

  if (user) {
    return formatJSONResponse({
      status: 'failed',
      error: `another user is already using the email ${email}`
    }, 400);
  }

  await DatabaseService.register(event.body);

  return formatJSONResponse({
    status: "success",
    data: event.body,
  }, 200);
};

export const main = middyfy(register);
