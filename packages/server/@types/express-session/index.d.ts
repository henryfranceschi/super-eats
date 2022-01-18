import { UserRole } from "../../src/entity/User";

declare module "express-session" {
    export interface SessionData {
        userID: string;
        userRole: UserRole;
        passwordResetToken: string
    }
}
