import { Module } from '@nestjs/common';
import { CalendarController } from './calendar.controller';
import { CalendarService } from './calendar.service';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from 'src/users/users.module';
import { CalendarEntity } from './entity/calendar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [HttpModule, UserModule, TypeOrmModule.forFeature([CalendarEntity])],
  controllers: [CalendarController],
  providers: [CalendarService],
})
export class CalendarModule {}
