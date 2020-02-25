
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface UserCreateInput {
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}

export interface UserInput {
    userName: string;
    password: string;
}

export interface AuthPayload {
    token: string;
}

export interface IMutation {
    login(userInput?: UserInput): AuthPayload | Promise<AuthPayload>;
    register(userCreateInput?: UserCreateInput): User | Promise<User>;
}

export interface IQuery {
    getUser(id: string): User | Promise<User>;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}
