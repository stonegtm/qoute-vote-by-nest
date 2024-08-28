import { PartialType } from '@nestjs/mapped-types';
import { CreateQouteDto } from './create-qoute.dto';

export class UpdateQouteDto extends PartialType(CreateQouteDto) {}
