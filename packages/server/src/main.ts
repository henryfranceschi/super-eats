import 'reflect-metadata';
import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import session, { SessionOptions } from 'express-session';
import cors from 'cors';
import Redis from 'ioredis';
import connectRedis from 'connect-redis';
import { createConnection, useContainer } from 'typeorm';
import { Container } from 'typeorm-typedi-extensions';
import { buildSchema } from 'type-graphql';
import {
    ProductResolver,
    RestaurantResolver,
    UserResolver,
    ReviewResolver,
} from './resolvers';
import { CartRowResolver } from './resolvers/cart/resolver';
import path from 'path';

async function main() {
    useContainer(Container);
    await createConnection();

    const redis = new Redis();
    const RedisStore = connectRedis(session);
    const app = express();

    const corsOptions = {
        credentials: true,
        origin: ['http://supereats.test', 'https://studio.apollographql.com'],
    };

    const sessionOptions: SessionOptions = {
        store: new RedisStore({
            client: redis,
        }),
        name: 'sid',
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            httpOnly: true,
            sameSite: 'strict',
            secure: process.env.NODE_ENV === 'production',
            maxAge: 30 * 60 * 1000,
        },
    };

    app.use(express.static(path.join(__dirname, '../storage')));
    app.use(cors(corsOptions));
    app.use(session(sessionOptions));

    const schema = await buildSchema({
        resolvers: [
            UserResolver,
            CartRowResolver,
            RestaurantResolver,
            ProductResolver,
            ReviewResolver,
        ],
        container: Container,
    });

    const apolloServer = new ApolloServer({
        schema,
        context: ({ req }: { req: express.Request }) => ({ req }),
    });
    await apolloServer.start();

    apolloServer.applyMiddleware({ app, cors: false });

    const server = app.listen(4000, () =>
        console.log('listening on port 4000')
    );

    // process.on('SIGINT', () => {
    //     console.log('Closing http server');
    //     server.close(() => {
    //         console.log('Server closed');
    //     });
    // });
}

main().catch((error) => console.error(error));
