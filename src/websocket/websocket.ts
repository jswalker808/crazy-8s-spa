
const API_GATEWAY_ENDPOINT_URL = process.env.REACT_APP_API_GATEWAY_ENDPOINT_URL as string;

const webSocket = new WebSocket(API_GATEWAY_ENDPOINT_URL);

export default webSocket;