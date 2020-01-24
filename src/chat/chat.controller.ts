import { Controller, Get, Render } from '@nestjs/common';

@Controller('chat')
export class ChatController {

    @Get()
    @Render('chat/index')
    // tslint:disable-next-line: no-empty
    index() {}
}
