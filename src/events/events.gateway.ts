import {
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
  OnGatewayConnection,
  OnGatewayDisconnect } from '@nestjs/websockets';
import WebSocket, { Server } from 'ws';

@WebSocketGateway()
export class EventsGateway implements OnGatewayConnection, OnGatewayDisconnect {

  clientsCount = 0;
  clientsList = [];

  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(client: any, payload: any) {
    this.clientsList.forEach((cl) => {
      if (client !== cl) {
        cl.send(payload);
      }
    });
  }

  handleConnection(client: any, ...args: any[]) {
    this.clientsCount++;
    this.clientsList.push(client);
  }

  handleDisconnect(client: any) {
    this.clientsCount--;
  }
}
