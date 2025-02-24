import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class CountriesService {
  constructor(
    private readonly httpService: HttpService,
    private readonly configService: ConfigService,
  ) {}

  async getAvailableCountries(): Promise<any> {
    const baseUrl = this.configService.get<string>('DATE_NAGER_BASE_URL');
    try {
      const response = await lastValueFrom(
        this.httpService.get(`${baseUrl}/AvailableCountries`),
      );
      return response.data;
    } catch (error) {
      throw new HttpException(
        'Failed to fetch available countries',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async getCountryInfo(countryCode: string): Promise<any> {
    const dateNagerBase = this.configService.get<string>('DATE_NAGER_BASE_URL');
    const populationApiUrl =
      this.configService.get<string>('POPULATION_API_URL');
    const flagApiUrl = this.configService.get<string>('FLAG_API_URL');

    try {
      const countryInfo$ = this.httpService.get(
        `${dateNagerBase}/CountryInfo/${countryCode}`,
      );
      const population$ = this.httpService.get(populationApiUrl!, {
        params: { country: countryCode },
      });

      const flag$ = this.httpService.get(flagApiUrl!, {
        params: { country: countryCode },
      });

      const [countryInfoRes, populationRes, flagRes] = await Promise.all([
        lastValueFrom(countryInfo$),
        lastValueFrom(population$),
        lastValueFrom(flag$),
      ]);

      const flagData = flagRes.data.data.find(
        (item) => item.iso2 === countryCode.toUpperCase(),
      );
      const flagUrl = flagData ? flagData.flag : null;

      console.log(flagUrl);

      return {
        borderCountries: countryInfoRes.data?.borders || [],
        flagUrl,
        populationData: populationRes.data,
      };
    } catch (error) {
      throw new HttpException(
        'Failed to fetch country information',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
}
