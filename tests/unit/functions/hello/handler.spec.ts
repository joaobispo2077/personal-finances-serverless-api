import { formatJSONResponse } from '../../../../src/libs/api-gateway';
import { main } from '../../../../src/functions/hello/handler';

jest.mock('@libs/api-gateway', () => ({
  formatJSONResponse: jest.fn(),
}));

describe('hello', () => {
  beforeEach(() => {
    formatJSONResponse.mockClear();
  });

  it('should respond with a welcome message', async () => {
    const event = {
      body: {
        name: 'John',
      },
    };

    const response = {
      message: 'Hello John, welcome to the exciting Serverless world!',
      event,
    };

    formatJSONResponse.mockReturnValue(response);

    const result = await main(event);

    expect(formatJSONResponse).toHaveBeenCalledWith(response);
    expect(result).toEqual(response);
  });
});
