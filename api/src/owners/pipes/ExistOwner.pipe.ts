import { ArgumentMetadata, Injectable, BadRequestException, PipeTransform } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Owner } from "../entities/owner.entity";

@Injectable()
export class ExistOwner implements PipeTransform {
  constructor(
    @InjectRepository(Owner)
    private ownersRepository: Repository<Owner>
  ){}
  async transform(value: string, metadata: ArgumentMetadata) {
      const owner = await this.ownersRepository.findOne(value);

      if(!owner) {
        throw new BadRequestException("Owner should be exists");
      }

      return value;
  }
}