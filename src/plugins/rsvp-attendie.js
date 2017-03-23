import {collection, ObjectID} from '../db';
import Joi from 'joi';
import Boom from 'boom';

const plugin = (server,options,next) => {

server.route({
    method: 'GET',
    path: '/v1/rsvp-attendie',
    config:{
        tags: ['api', 'v1'],
        validate: {
            query: {
                firstName: Joi.string().required().max(30),
                lastName: Joi.string().required().max(30),
                email: Joi.string().required().max(30),
                companyName: Joi.string().required().max(30),
            }
        }
    },
    handler: {
        async: async (request, reply) => {
             const {firstName, lastName,email,companyName} = request.query;
            const attendies = await collection('attendies');
            let markedAttended = true;
            const cursor = await attendies.find({ $and: [ { firstName: request.query.firstName }, { lastName: request.query.lastName }, {email: request.query.email}, {companyName: request.query.companyName} ] });
            const locatedAttendie = await cursor.toArray();
            console.log(locatedAttendie);
            if(locatedAttendie.length > 0){
                 return reply({message: 'Attendie has been found'});
            }
            else{
                return reply({message: 'No results found'});
            }
  
            return await reply(Boom.badImplementation('An error occured'));

        }
    }
})

 next();   
}

plugin.attributes = {
    name: 'rsvp-attendie',
    version: '1.0.0'
}

export default plugin;