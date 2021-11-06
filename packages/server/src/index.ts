import "reflect-metadata";
import { ApolloServer } from 'apollo-server-express';
import express from "express";
import Redis from "ioredis";
import connectRedis from 'connect-redis';
import { buildSchema } from 'type-graphql';
import { createConnection } from "typeorm";
import cors from "cors";
import session, { SessionOptions } from 'express-session';
import { ProductResolver, RestaurantResolver, UserResolver, ReviewResolver } from './resolvers';

async function main() {
    await createConnection();
    const redis = new Redis();
    const RedisStore = connectRedis(session);
    const app = express();

    const corsOptions = {
        credentials: true,
        origin: "http://localhost:3000"
    };

    const sessionOptions: SessionOptions = {
        store: new RedisStore({
            client: redis,
        }),
        name: "sid",
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'none',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 60 * 1000
        }
    };

    app.use(cors(corsOptions));
    app.use(session(sessionOptions));

    const schema = await buildSchema({
        resolvers: [UserResolver, RestaurantResolver, ProductResolver, ReviewResolver]
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: { req: express.Request }) => ({ req })
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app });

    app.listen(4000, () => console.log('listening on port 4000'));
}

main().catch((error) => console.error(error));