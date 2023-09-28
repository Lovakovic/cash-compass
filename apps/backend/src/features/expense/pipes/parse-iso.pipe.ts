import {BadRequestException, Injectable, PipeTransform} from '@nestjs/common';

@Injectable()
export class ParseISOPipe implements PipeTransform<string, Date> {
  transform(value: string): Date {
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException(`Validation failed: ${value} is not an ISO8601 date`);
    }
    return date;
  }
}
