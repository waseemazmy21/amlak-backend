import { Schema, model, Document } from 'mongoose';

export enum PropertyType {
    House = 'house',
    Apartment = 'apartment',
    Condo = 'condo',
    Townhouse = 'townhouse',
    Land = 'land',
}

export enum PropertyStatus {
    ForSale = 'for-sale',
    ForRent = 'for-rent',
    Sold = 'sold',
    Rented = 'rented',
}

export interface Property extends Document {
    _id: string;
    title: string;
    description: string;
    price: number;
    location: {
        address: string;
        city: string;
        state: string;
    };
    propertyType: PropertyType;
    bedrooms: number;
    bathrooms: number;
    area: number;
    images: string[];
    yearBuilt: number;
    status: PropertyStatus;
    features: string[];
    createdAt: Date;
    updatedAt: Date;
}

const locationSchema = new Schema({
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
}, { _id: false });

const propertySchema = new Schema<Property>({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50
    },
    description: {
        type: String,
        required: true,
        minLength: 10,
    },
    price: {
        type: Number,
        required: true
    },
    location: {
        type: locationSchema,
        required: true
    },
    propertyType: {
        type: String,
        enum: Object.values(PropertyType),
        required: true
    },
    bedrooms: {
        type: Number,
        required: true
    },
    bathrooms: {
        type: Number,
        required: true
    },
    area: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        default: []
    },
    yearBuilt: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        enum: Object.values(PropertyStatus),
        default: PropertyStatus.ForSale
    },
    features: {
        type: [String],
        default: []
    }
}, { timestamps: true });

export default model<Property>('Property', propertySchema);
