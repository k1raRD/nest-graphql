import { IsNotEmpty, IsString, IsUUID } from 'class-validator';
import { CreateListInput } from './create-list.input';
import { InputType, Field, PartialType, ID } from '@nestjs/graphql';

@InputType()
export class UpdateListInput extends PartialType(CreateListInput) {
  @Field(() => ID)
  @IsString()
  @IsNotEmpty()
  @IsUUID()
  id: string;
}
