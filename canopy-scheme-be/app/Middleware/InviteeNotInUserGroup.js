"use strict";
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */
const { sanitize } = use("Validator");
const User = use("App/Models/User");
const InternalServerError = use("App/Exceptions/InternalServerError");

class InviteeNotInUserGroup {
    /**
     * @param {object} ctx
     * @param {Request} ctx.request
     * @param {Function} next
     */
    async handle({ request, response }, next) {
        const rules = {
            invitee_email: "decode_uri_and_decrypt|normalize_email"
        };
        const { invitee_email } = sanitize(request.params, rules);
        // request.params.invitee_email = invitee_email;

        try {
            const user = await User.query()
                .where("email", invitee_email)
                .first();
            if (user == null)
                return response
                    .status(200)
                    .json({ msg: "Invalid invite link." });
            request.params.invitee = user; // add invitee to the header

            const groupCount = await user.group().first();
            if (groupCount !== null) {
                return response
                    .status(200)
                    .json({ msg: "You already belong to a group." });
            }
        } catch (err) {
            throw new InternalServerError();
        }

        await next();
    }
}

module.exports = InviteeNotInUserGroup;
