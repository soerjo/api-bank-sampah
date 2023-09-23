import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { SampahService } from './sampah.service';
import { CreateSampahDto } from './dto/create-sampah.dto';
import { UpdateSampahDto } from './dto/update-sampah.dto';
import { QueryParamsSampahDto } from './dto/query-sampah.dto';

@Controller('sampah')
export class SampahController {
  constructor(private readonly sampahService: SampahService) {}

  @Post()
  create(@Body() createSampahDto: CreateSampahDto) {
    return this.sampahService.create(createSampahDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsSampahDto) {
    return this.sampahService.findAll(queryParams);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.sampahService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateSampahDto: UpdateSampahDto) {
    return this.sampahService.update(id, updateSampahDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.sampahService.remove(id);
  }
}
