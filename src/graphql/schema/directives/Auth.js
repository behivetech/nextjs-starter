import {SchemaDirectiveVisitor, AuthenticationError} from 'apollo-server-micro';
import {ensureSignedIn} from '../../lib/auth';

// const ensureSignedIn = () => true;
export default class AuthDirectives extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve} = field;

        field.resolve = async function (...args) {
            const signedIn = await ensureSignedIn(args[2]);

            if (!signedIn) {
                throw new AuthenticationError('NOT_AUTHENTICATED');
            }

            return resolve.apply(this, args);
        };
    }
}
