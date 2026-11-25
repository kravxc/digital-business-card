import { Field, InputType } from '@nestjs/graphql';

@InputType({
  description: 'Данные для обновления профиля',
})
export class UpdateProfileInput {
  @Field(() => String, {
    description: 'ID профиля',
  })
  id: string;

  @Field(() => String, {
    nullable: true,
    description: 'Имя пользователя',
  })
  name?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Описание профиля',
  })
  description?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на GitHub',
  })
  githubUrl?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на LinkedIn',
  })
  linkedinUrl?: string;

  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на веб-сайт',
  })
  websiteUrl?: string;
}
