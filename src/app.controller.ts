import { Controller } from '@nestjs/common';
//import { AppService } from './app.service';

@Controller()
export class AppController {
  /*
  constructor(private readonly appService: AppService) {}
  
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('name')
  getName(): string {
    return 'Hello Cristian';
  }

  @Get('funnels/:id')
  getFunnel(@Param('id') id: number) {
    return ` Funnel ${id}`;
  }

  @Get('funnels/:id/steps/:step')
  getStep(@Param('id') id: number, @Param('step') step: string) {
    return ` Funnel ${id} and step ${step}`;
  }

  @Get('products')
  getFilter(@Query() query: any) {
    const { limit, offset } = query;
    return `Filter by -> limit: ${limit} offset: ${offset}`;
  }

  @Get('funnels')
  getFilterByTypo(
    @Query('limit') limit: number,
    @Query('offset') offset: number,
    @Query('type') type: string,
  ) {
    return `
      Filter by -> limit: ${limit} offset: ${offset} type: ${type}
    `;
  }
  */
}
