import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({ description: 'Todo quick aggregations' })
export class AggregationType {
  @Field(() => Int)
  total: number;
  @Field(() => Int)
  pending: number;
  @Field(() => Int)
  completed: number;
  @Field(() => Int, { deprecationReason: 'Must use completed instead' })
  totalTodosCompleted: number;
}
