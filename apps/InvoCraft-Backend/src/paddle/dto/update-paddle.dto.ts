import { PartialType } from '@nestjs/mapped-types';
import { CreatePaddleDto } from './create-paddle.dto';

export class UpdatePaddleDto extends PartialType(CreatePaddleDto) {}
