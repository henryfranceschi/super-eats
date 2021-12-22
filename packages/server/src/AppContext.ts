import express from 'express';

interface AppContext {
    req: express.Request;
}

export default AppContext;
