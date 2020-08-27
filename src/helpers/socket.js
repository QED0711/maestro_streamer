import io from "socket.io-client";
import config from '../config.json';

const SERVER_HOST = process.env.REACT_APP_SERVER_HOST || config.server_host || window.location.hostname;
const SERVER_PORT = process.env.REACT_APP_SERVER_PORT || config.server_port;
const SERVER_PROTOCOL = process.env.REACT_APP_SERVER_PROTOCOL || config.server_protocol || "https"

const SERVER_URL = `${SERVER_PROTOCOL}://${SERVER_HOST}:${SERVER_PORT}/`

const socket = io(SERVER_URL, {transports: ['websocket'], rejectUnauthorized: false});

export default socket;

