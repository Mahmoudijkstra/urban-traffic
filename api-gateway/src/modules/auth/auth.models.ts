import { ObjectType, Field, ID, InputType, registerEnumType, GraphQLISODateTime } from '@nestjs/graphql';
import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';

export enum Role {
  ADMIN = 'ADMIN',
  OPERATOR = 'OPERATOR',
}
registerEnumType(Role, { name: 'Role' });

@ObjectType()
export class User {
  @Field(() => ID) id: string;
  @Field() email: string;
  @Field() firstName: string;
  @Field() lastName: string;
  @Field(() => Role) role: Role;
  @Field(() => GraphQLISODateTime) createdAt: Date;
}

@ObjectType()
export class AuthResponse {
  @Field() accessToken: string;
  @Field(() => User) user: User;
}

@InputType()
export class RegisterInput {
  @Field() @IsEmail() email: string;
  @Field() @IsString() @MinLength(6) password: string;
  @Field() @IsString() firstName: string;
  @Field() @IsString() lastName: string;
  @Field(() => Role, { nullable: true }) @IsEnum(Role) @IsOptional() role?: Role;
}

@InputType()
export class LoginInput {
  @Field() @IsEmail() email: string;
  @Field() @IsString() password: string;
}
