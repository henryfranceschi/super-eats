import * as yup from 'yup';
import { Categories, Diets } from '../../generated/graphql';

export const createProductSchema = yup.object({
    name: yup.string().required(),
    description: yup.string().required(),
    price: yup.number().required(),
    category: yup.string().required().oneOf(Object.values(Categories)),
    diet: yup.string().required().oneOf(Object.values(Diets))
})

export const updateProductSchema = yup.object({
    name: yup.string(),
    description: yup.string(),
    price: yup.number(),
    category: yup.string().oneOf(Object.values(Categories)),
    diet: yup.string().oneOf(Object.values(Diets))
})