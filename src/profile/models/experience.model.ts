import type { Experience } from '@prisma/client';
import { BaseModel } from '../../common/models/base.model.js';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Модель опыта работы',
})
export class ExperienceModel extends BaseModel implements Experience {
  @Field(() => String, {
    nullable: false,
    description: 'Название компании',
  })
  company: string;

  @Field(() => String, {
    nullable: false,
    description: 'Должность',
  })
  position: string;

  @Field(() => Date, {
    nullable: false,
    description: 'Дата начала',
  })
  startDate: Date;

  @Field(() => Date, {
    nullable: false,
    description: 'Дата окончания',
  })
  endDate: Date;

  @Field(() => [String], {
    nullable: false,
    description: 'Достижения',
  })
  achievments: string[];

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
