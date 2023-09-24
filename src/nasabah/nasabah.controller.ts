import { Controller, Get, Post, Body, Patch, Param, Delete, Query, HttpException, HttpStatus } from '@nestjs/common';
import { NasabahService } from './nasabah.service';
import { CreateNasabahDto } from './dto/create-nasabah.dto';
import { UpdateNasabahDto } from './dto/update-nasabah.dto';
import { QueryParamsDto } from './dto/query-params.dto';
import { ApiQuery } from '@nestjs/swagger';

@Controller('nasabah')
export class NasabahController {
  constructor(private readonly nasabahService: NasabahService) {}

  @Post()
  create(@Body() createNasabahDto: CreateNasabahDto) {
    return this.nasabahService.create(createNasabahDto);
  }

  @Get()
  findAll(@Query() queryParams: QueryParamsDto) {
    return this.nasabahService.findAll(queryParams);
  }

  @Get('/total')
  getTotal() {
    return this.nasabahService.getTotalNasabah();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const response = await this.nasabahService.findOne(id);
    if (!response) return new HttpException('sampah not found!', HttpStatus.NOT_FOUND);
    return response;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNasabahDto: UpdateNasabahDto) {
    return this.nasabahService.update(id, updateNasabahDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nasabahService.remove(id);
  }
}
