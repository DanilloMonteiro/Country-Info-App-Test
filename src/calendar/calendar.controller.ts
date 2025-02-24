// calendar.controller.ts
import { Controller, Post, Param, Body } from '@nestjs/common';
import { CalendarService } from './calendar.service';
import { AddHolidaysDto } from './dtos/add-holidays.dto';

@Controller('users/:userId/calendar')
export class CalendarController {
  constructor(private readonly calendarService: CalendarService) {}

  @Post('holidays')
  async addHolidays(
    @Param('userId') userId: string,
    @Body() addHolidaysDto: AddHolidaysDto,
  ) {
    return this.calendarService.addHolidays(userId, addHolidaysDto);
  }
}
