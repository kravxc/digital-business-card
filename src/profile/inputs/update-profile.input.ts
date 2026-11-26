import { Field, InputType } from '@nestjs/graphql';
import { IsOptional, IsString } from 'class-validator';

@InputType({
  description: 'Данные для обновления профиля',
})
export class UpdateProfileInput {
  
  @IsString()
  @Field(() => String, {
    description: 'ID профиля',
  })
  id: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Имя пользователя',
  })
  name?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Описание профиля',
  })
  description?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на GitHub',
  })
  githubUrl?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на LinkedIn',
  })
  linkedinUrl?: string;

  @IsOptional()
  @IsString()
  @Field(() => String, {
    nullable: true,
    description: 'Ссылка на веб-сайт',
  })
  websiteUrl?: string;
}
