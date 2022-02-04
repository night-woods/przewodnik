import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    ParseIntPipe,
    Patch,
    Post,
  } from '@nestjs/common'
  import { ApiBody, ApiTags } from '@nestjs/swagger'
  import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto'
  import { LocationService } from './location.service'
  
  @ApiTags('locations')
  @Controller('locations')
  export class LocationController {
    constructor(private readonly service: LocationService) {}
  
    @Get()
    findAll() {
      return this.service.findAll()
    }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.service.findOne(id)
    }
  
    @Post()
    @ApiBody({ type: CreateLocationDto })
    createlocation(@Body() location: CreateLocationDto) {
      return this.service.create(location)
    }
  
    @Patch(':id')
    @ApiBody({ type: UpdateLocationDto })
    updatelocation(
      @Param('id', ParseIntPipe) id: number,
      @Body() location: UpdateLocationDto,
    ) {
      return this.service.update(location, id)
    }
  
    @Delete(':id')
    deletelocation(@Param('id', ParseIntPipe) id: number) {
      return this.service.delete(id)
    }
  }
  