// data/users.ts

export interface TestUser {
    username: string;
    password: string;
    role: string;
}

export const standardUser: TestUser = {
    username: 'standard_user',
    password: 'secret_sauce',
    role: 'standard'
};

export const lockedOutUser: TestUser = {
    username: 'locked_out_user',
    password: 'secret_sauce',
    role: 'locked'
};