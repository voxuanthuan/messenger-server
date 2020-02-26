
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface MessageInput {
    roomID: string;
    content: string;
}

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

export interface Message {
    id: string;
    content: string;
    roomID: string;
    createdBy: string;
    createdAt: number;
}

export interface IMutation {
    login(userInput?: UserInput): AuthPayload | Promise<AuthPayload>;
    createMessage(message: MessageInput): Message | Promise<Message>;
    register(userCreateInput?: UserCreateInput): User | Promise<User>;
}

export interface IQuery {
    getUser(id: string): User | Promise<User>;
}

export interface ISubscription {
    messageCreated(roomID: string): Message | Promise<Message>;
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    userName: string;
    password: string;
}
