import type { Profile } from '@prisma/client';
import { BaseModel } from '../../common/models/base.model.js';
import { Field, ObjectType } from '@nestjs/graphql';
import { SkillModel } from './skill.model.js';
import { ExperienceModel } from './experience.model.js';
import { ProjectModel } from './project.model.js';

@ObjectType({
  description: 'Модель профиля',
})
export class ProfileModel extends BaseModel implements Profile {
  @Field(() => String, {
    nullable: false,
    description: 'Имя пользователя',
  })
  name: string;

  @Field(() => String, {
    nullable: false,
    description: 'Описание профиля',
  })
  description: string;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на GitHub',
  })
  githubUrl: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на LinkedIn',
  })
  linkedinUrl: string | null;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на веб-сайт',
  })
  websiteUrl: string | null;

  @Field(() => [SkillModel], {
    nullable: true,
    description: 'Навыки',
  })
  skills?: SkillModel[];

  @Field(() => [ExperienceModel], {
    nullable: true,
    description: 'Опыт работы',
  })
  experience?: ExperienceModel[];

  @Field(() => [ProjectModel], {
    nullable: true,
    description: 'Проекты',
  })
  projects?: ProjectModel[];
}
