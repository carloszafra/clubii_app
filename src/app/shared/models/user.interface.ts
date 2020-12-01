export interface userI {
    _id?: string;
    name?: string;
    description?: string;
    username: string;
    email: string;
    birthday?: string;
    country?: string;
    twitter?: string;
    instagram?: string;
    avatarUrl?: string;
    coverUrl?: string;
    password?: string;
    timestamp?: Date;
}

export class User {
    constructor(
        public _id?: string,
        public name?: string,
        public description?: string,
        public username?: string,
        public email?: string,
        public birthday?: string,
        public country?: string,
        public twitter?: string,
        public instagram?: string,
        public avatarUrl?: string,
        public coverUrl?: string,
        public password?: string,
        public timestamp?: Date,

    ) {

    }
}