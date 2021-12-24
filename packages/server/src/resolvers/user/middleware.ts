import { UserRole } from '../../entity/User';
import { authorizeIf } from '../middleware';

export const ownProfile = authorizeIf((args, context) => {
    const { userID, userRole } = context.req.session;
    return userID === args.id || userRole === UserRole.Admin;
});
