import {collection, ObjectID} from '../db';
import Joi from 'joi';
import Boom from 'boom';

const plugin = (server,options,next) => {

server.route({
    method: 'POST',
    path: '/v1/add-attendie-list',
    config:{
        tags:['api','v1'],
        validate:{
            
        }
    }
})


    next();
}