import {collection, ObjectID} from '../db';
import Joi from 'joi';
import Boom from 'boom';

const plugin = (server,options,next) => {

server.route({
    method: 'POST',
    path: '/v1/walk-in-attendie',
    config:{
        tags: ['api', 'v1'],
        validate: {
            payload: {
                firstName: Joi.string().required(),
                lastName: Joi.string().required(),
                email: Joi.string().required(),
                companyName: Joi.string().required()
            }
        }
    },
    handler: {
        async: async (request, reply) => {
            const {firstName, lastName,email,companyName} = request.payload;
            const attendies = await collection('attendies');
            let markedAttended = true;
            const result = await attendies.insertOne({firstName,lastName,email,companyName, markedAttended});
            if(result.insertedCount === 1){
                return reply(result, {message: 'Attendie has been added'}).status(201)
            }
            return await reply(Boom.badImplementation('An error occured'));
        }
    }
})

 next();   
};
 
plugin.attributes = {
    name: 'walk-in-attendie',
    version: '1.0.0'
}

export default plugin;