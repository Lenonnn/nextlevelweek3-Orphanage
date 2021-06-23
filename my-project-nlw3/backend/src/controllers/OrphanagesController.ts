import { Request, Response } from 'express';

// Chama regra de como adionar um orphanage
import { getRepository } from 'typeorm';

import * as Yup from 'yup';

import Orphanage from '../models/Orphanage';
import OrphanageView from '../views/OrphanageView';



export default {

    // Listar orfanatos
    async index(request: Request, response: Response) {
        const orphanageRepository = getRepository(Orphanage);

        const orphanages = await orphanageRepository.find({
            relations: ['images']
        });

        return response.json(OrphanageView.renderMany(orphanages));

    },

    // Listar orfanatos
    async show(request: Request, response: Response) {
        const { id } = request.params;

        const orphanageRepository = getRepository(Orphanage);

        const orphanage = await orphanageRepository.findOneOrFail(id, {
            relations: ['images'],
        });

        // Vai renderizar e retornar os dados oriundos da View
        return response.json(OrphanageView.render(orphanage));
    },




    // Criar novo orfanato
    async create(request: Request, response: Response) {
        // Imprime os dados do arquivo enviado
        // console.log(request.files);

        // Imprime no console os dados do corpo da requisição de POST  
        // console.log(request.body);

        // Desestruturar o request body para pegar os dados que tem dentro do corpo da requisição
        const {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends
        } = request.body;

        // Chama/importa a estrutura de Orphanage 
        // Passa todos os métodos para 'orphanageRepository' passando a estrutura como parametro
        const orphanageRepository = getRepository(Orphanage);

        // Recebe as images
        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return {
                path: image.filename
            }
        });

        const data = {
            name,
            latitude,
            longitude,
            about,
            instructions,
            opening_hours,
            open_on_weekends,
            images
        };

        const schema = Yup.object().shape({
            name: Yup.string().required(`Campo 'nome' é obrigatório !`),
            latitude: Yup.number().required(),
            longitude: Yup.number().required(),
            about: Yup.string().required().max(300),
            instructions: Yup.string().required(),
            opening_hours: Yup.string().required(),
            open_on_weekends: Yup.boolean().required(),
            images: Yup.array(
                Yup.object().shape(
                    {
                        path: Yup.string().required()
                    })
            ),
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        // Cria um novo orfanato
        const orphanage = orphanageRepository.create(data);

        // Salva o orfanto criado
        await orphanageRepository.save(orphanage);

        // return response.json({message: "Sucessfull on creation Orphanage"});
        return response.status(201).json(orphanage);
    }


}