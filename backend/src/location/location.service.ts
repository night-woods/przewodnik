import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateLocationDto, UpdateLocationDto } from './dto/location.dto'

import { LocationRepository } from './location.repository'

@Injectable()
export class LocationService {
  constructor(private readonly locationRepository: LocationRepository) {}

  async findAll() {
    return {
      data: await this.locationRepository.findAll(),
    }
  }

  async findOne(id: number) {
    const location = await this.locationRepository.findOne(id)

    if (!location) {
      throw new NotFoundException('Location with given ID not found')
    }

    return {
      data: location,
    }
  }

  async create(data: CreateLocationDto) {
    return {
      data: await this.locationRepository.create(data),
    }
  }

  async update(data: UpdateLocationDto, id: number) {
    const location = await this.findOne(id)
    return { data: await this.locationRepository.update(data, location.data.id) }
  }

  async delete(id: number) {
    const location = await this.findOne(id)

    await this.locationRepository.delete(location.data.id)
  }
}
