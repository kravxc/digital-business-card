import type { Project } from '@prisma/client';
import { BaseModel } from '../../common/models/base.model.js';
import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType({
  description: 'Модель проекта',
})
export class ProjectModel extends BaseModel implements Project {
  @Field(() => String, {
    nullable: false,
    description: 'Название проекта',
  })
  name: string;

  @Field(() => String, {
    nullable: true,
    description: 'URL проекта',
  })
  url: string | null;

  @Field(() => String, {
    nullable: false,
    description: 'URL репозитория',
  })
  repoUrl: string;

  @Field(() => String, {
    nullable: true,
    description: 'Описание проекта',
  })
  description: string | null;

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
