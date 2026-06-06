import { Resolver, Mutation, Query, Args, Context } from '@nestjs/graphql';
import { UseGuards } from '@nestjs/common';
import { HttpClientService } from '../common/http-client.service';
import { JwtAuthGuard } from '../common/jwt-auth.guard';
import { AuthResponse, User, RegisterInput, LoginInput } from './auth.models';

const AUTH_URL = process.env.AUTH_SERVICE_URL || 'http://localhost:3001/graphql';

@Resolver()
export class AuthResolver {
  constructor(private http: HttpClientService) {}

  @Mutation(() => AuthResponse)
  async register(@Args('input') input: RegisterInput) {
    const data = await this.http.graphqlRequest(AUTH_URL, `
      mutation Register($input: RegisterInput!) {
        register(input: $input) {
          accessToken
          user { id email firstName lastName role createdAt }
        }
      }
    `, { input });
    return data.register;
  }

  @Mutation(() => AuthResponse)
  async login(@Args('input') input: LoginInput) {
    const data = await this.http.graphqlRequest(AUTH_URL, `
      mutation Login($input: LoginInput!) {
        login(input: $input) {
          accessToken
          user { id email firstName lastName role createdAt }
        }
      }
    `, { input });
    return data.login;
  }

  @Query(() => User)
  @UseGuards(JwtAuthGuard)
  async me(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(AUTH_URL, `
      query { me { id email firstName lastName role createdAt } }
    `, {}, ctx.req.token);
    return data.me;
  }

  @Query(() => [User])
  @UseGuards(JwtAuthGuard)
  async users(@Context() ctx: any) {
    const data = await this.http.graphqlRequest(AUTH_URL, `
      query { users { id email firstName lastName role createdAt } }
    `, {}, ctx.req.token);
    return data.users;
  }
}
