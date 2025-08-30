import Joi from 'joi';
import { PropertyType, PropertyStatus } from '../models/property';

export const createPropertySchema = Joi.object({
    title: Joi.string().required().messages({
        'string.empty': 'Title is required',
        'any.required': 'Title is required',
    }),
    description: Joi.string().required().messages({
        'string.empty': 'Description is required',
        'any.required': 'Description is required',
    }),
    price: Joi.number().required().messages({
        'number.base': 'Price must be a number',
        'any.required': 'Price is required',
    }),
    location: Joi.object({
        address: Joi.string().required().messages({
            'string.empty': 'Address is required',
            'any.required': 'Address is required',
        }),
        city: Joi.string().required().messages({
            'string.empty': 'City is required',
            'any.required': 'City is required',
        }),
        state: Joi.string().required().messages({
            'string.empty': 'State is required',
            'any.required': 'State is required',
        }),
    }).required().messages({
        'any.required': 'Location is required',
    }),
    propertyType: Joi.string().valid(...Object.values(PropertyType)).required().messages({
        'any.only': `Property type must be one of ${Object.values(PropertyType).join(', ')}`,
        'any.required': 'Property type is required',
    }),
    propertyStatus: Joi.string().valid(...Object.values(PropertyStatus)).required().messages({
        'any.only': `Property status must be one of ${Object.values(PropertyStatus).join(', ')}`,
        'any.required': 'Property status is required',
    }),
    bedrooms: Joi.number().required().messages({
        'number.base': 'Bedrooms must be a number',
        'any.required': 'Bedrooms is required',
    }),
    bathrooms: Joi.number().required().messages({
        'number.base': 'Bathrooms must be a number',
        'any.required': 'Bathrooms is required',
    }),
    area: Joi.number().required().messages({
        'number.base': 'Area must be a number',
        'any.required': 'Area is required',
    }),
    yearBuilt: Joi.number().required().messages({
        'number.base': 'Year built must be a number',
        'any.required': 'Year built is required',
    }),

    features: Joi.array().items(Joi.string()).default([]),
});

export const updatePropertySchema = Joi.object({
    title: Joi.string().messages({
        'string.empty': 'Title cannot be empty',
    }),
    description: Joi.string().messages({
        'string.empty': 'Description cannot be empty',
    }),
    price: Joi.number().messages({
        'number.base': 'Price must be a number',
    }),
    location: Joi.object({
        address: Joi.string().messages({
            'string.empty': 'Address cannot be empty',
        }),
        city: Joi.string().messages({
            'string.empty': 'City cannot be empty',
        }),
        state: Joi.string().messages({
            'string.empty': 'State cannot be empty',
        }),
    }),
    propertyType: Joi.string().valid(...Object.values(PropertyType)).messages({
        'any.only': `Property type must be one of ${Object.values(PropertyType).join(', ')}`,
    }),
    propertyStatus: Joi.string().valid(...Object.values(PropertyStatus)).messages({
        'any.only': `Property status must be one of ${Object.values(PropertyStatus).join(', ')}`,
    }),
    bedrooms: Joi.number().messages({
        'number.base': 'Bedrooms must be a number',
    }),
    bathrooms: Joi.number().messages({
        'number.base': 'Bathrooms must be a number',
    }),
    area: Joi.number().messages({
        'number.base': 'Area must be a number',
    }),
    yearBuilt: Joi.number().messages({
        'number.base': 'Year built must be a number',
    }),
    status: Joi.string().valid(...Object.values(PropertyStatus)).messages({
        'any.only': `Status must be one of ${Object.values(PropertyStatus).join(', ')}`,
    }),
}).min(1);

export const propertyFiltersSchema = Joi.object({
    search: Joi.string(),
    minPrice: Joi.number(),
    maxPrice: Joi.number(),
    propertyType: Joi.string().valid(...Object.values(PropertyType)),
    minBedrooms: Joi.number(),
    maxBedrooms: Joi.number(),
    minBathrooms: Joi.number(),
    maxBathrooms: Joi.number(),
    page: Joi.number().min(1),
    limit: Joi.number().min(1),
});
