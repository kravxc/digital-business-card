import type { Skill } from '@prisma/client';
import { BaseModel } from '../../common/models/base.model.js';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Модель навыка',
})
export class SkillModel extends BaseModel implements Skill {
  @Field(() => String, {
    nullable: false,
    description: 'Название навыка',
  })
  name: string;

  @Field(() => Int, {
    nullable: false,
    description: 'Порядок сортировки',
  })
  sortOrder: number;

  @Field(() => String, {
    nullable: false,
    description: 'ID профиля',
  })
  profileId: string;
}
