import type { ValidatedEventAPIGatewayProxyEvent } from '@libs/api-gateway';
import { formatJSONResponse } from '@libs/api-gateway';
import { middyfy } from '@libs/lambda';

import schema from './schema';
import DatabaseService from '../../../services';
import { generateToken } from '@services/token-service';

const login: ValidatedEventAPIGatewayProxyEvent<typeof schema> = async (event) => {
  const { email, password } = event.body;

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

  const user = await DatabaseService.login(email, password);
  if (!user) {
    return formatJSONResponse({
      status: 'failed',
      error: 'signin failed'
    }, 400);
  } else {
    const token = await generateToken(user);
    delete user["issuer"];
    return formatJSONResponse({
      status: "success",
      data: {
        user,
        token
      },
    }, 200);
  }
};

export const main = middyfy(login);
