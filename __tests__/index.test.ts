import Explorer from '../src';

const { WEBSOCKET_PROVIDER } = process.env;

const explorer = new Explorer({ host: WEBSOCKET_PROVIDER! });

test('Explorer', () => {

    //explorer

    expect(1).toBe(1);

});