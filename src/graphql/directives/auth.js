import {SchemaDirectiveVisitor} from 'graphql-tools';
import {defaultFieldResolver} from 'graphql';
import {ensureSignedIn} from '../lib/auth';

class AuthDirective extends SchemaDirectiveVisitor {
    visitFieldDefinition(field) {
        const {resolve = defaultFieldResolver} = field;

        field.resolve = function (...args) {
            const [, , context] = args;
            // TODO: Need to work out the context end of this.
            // Context is null through this; however, esnsureSignedIn
            // requires much of the primary context set when initializing
            // const isSignedIn = () => ensureSignedIn(context);
            //
            // const signedIn = isSignedIn();

            return resolve.apply(this, args);
        };
    }
}

export default AuthDirective;
