import openSocket from 'socket.io-client';
import {fromEvent} from 'rxjs';
import {tap} from "rxjs/operators";
import {SERVER_URL} from "../containers/App/App";

export const socket = openSocket(SERVER_URL);

export const refreshEvents = fromEvent(socket, 'refreshEvents').pipe(
    tap(emitRefreshHashtags)
);

export const eventList = fromEvent(socket, 'eventList');
export const hashtagList = fromEvent(socket, 'hashtagList');

export function emitEventSearch(hashtags) {
    hashtags = hashtags || [];
    socket.emit('eventSearch', hashtags)
}

export function emitRefreshHashtags() {
    socket.emit('refreshHashtags');
}
