import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';
import { AddHolidaysDto } from './dtos/add-holidays.dto';
import { UserService } from 'src/users/users.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CalendarEntity } from './entity/calendar.entity';

@Injectable()
export class CalendarService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
    @InjectRepository(CalendarEntity)
    private readonly calendarRepository: Repository<CalendarEntity>,
  ) {}

  async addHolidays(
    userId: string,
    addHolidaysDto: AddHolidaysDto,
  ): Promise<any> {
    const { countryCode, year, holidays } = addHolidaysDto;
    const baseUrl = this.configService.get<string>('DATE_NAGER_BASE_URL');

    const user = await this.userService.findOne(userId);
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    }

    try {
      const response = await lastValueFrom(
        this.httpService.get(
          `${baseUrl}/PublicHolidays/${year}/${countryCode}`,
        ),
      );
      let holidayList = response.data;

      if (!Array.isArray(holidayList)) {
        throw new HttpException(
          'Invalid holiday data received',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }

      if (holidays && holidays.length > 0) {
        holidayList = holidayList.filter(
          (holiday) =>
            holidays.includes(holiday.localName) ||
            holidays.includes(holiday.name),
        );
      }

      const events = holidayList.map((holiday) => {
        return this.calendarRepository.create({
          user_id: user.id,
          holiday_name: holiday.localName || holiday.name,
          year: year.toString(),
          country_code: countryCode,
        });
      });

      const savedEvents = await this.calendarRepository.save(events);

      return {
        message: 'Holidays added to the calendar successfully',
        data: savedEvents,
      };
    } catch (error) {
      console.error('Error in addHolidays:', error);
      throw new HttpException('Failed to add holidays', HttpStatus.BAD_REQUEST);
    }
  }
}
