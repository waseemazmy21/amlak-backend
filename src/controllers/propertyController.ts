import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Property from '../models/property';
import AppError from '../util/AppError';
import cloudinary from '../config/cloudinary';

// Create Property
export const createProperty = asyncHandler(async (req: Request, res: Response) => {
    let imageUrls: string[] = [];
   if (req.files && Array.isArray(req.files)) {
        const uploadPromises = req.files.map((file: Express.Multer.File) => {
            return new Promise<string>((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',
                        folder: 'amlak-properties',
                        transformation: [
                            { width: 1200, height: 800, crop: 'limit' },
                            { quality: 'auto' }
                        ]
                    },
                    (error, result) => {
                        if (error) {
                            reject(error);
                        } else {
                            resolve(result!.secure_url);
                        }
                    }
                ).end(file.buffer);
            });
        });

        try {
            imageUrls = await Promise.all(uploadPromises);
        } catch (error) {
            throw new AppError('Failed to upload images to Cloudinary', 500);
        }
    }

    // Add image URLs to request body
    const propertyData = {
        ...req.body,
        images: imageUrls
    };

    const property = await Property.create(propertyData);
    console.log(req.body);

    res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: { property }
    });
});

// Get Properties with Filters, Sorting, Pagination
export const getProperties = asyncHandler(async (req: Request, res: Response) => {
    const {
        city,
        minPrice,
        maxPrice,
        propertyType,
        minBedrooms,
        maxBedrooms,
        minBathrooms,
        maxBathrooms,
        page = 1,
        limit = 10
    } = req.query;

    const filter: any = {};
    if (city) filter['location.city'] = city;
    if (propertyType) filter.propertyType = propertyType;
    if (minPrice || maxPrice) filter.price = {};
    if (minPrice) filter.price.$gte = Number(minPrice);
    if (maxPrice) filter.price.$lte = Number(maxPrice);
    if (minBedrooms || maxBedrooms) filter.bedrooms = {};
    if (minBedrooms) filter.bedrooms.$gte = Number(minBedrooms);
    if (maxBedrooms) filter.bedrooms.$lte = Number(maxBedrooms);
    if (minBathrooms || maxBathrooms) filter.bathrooms = {};
    if (minBathrooms) filter.bathrooms.$gte = Number(minBathrooms);
    if (maxBathrooms) filter.bathrooms.$lte = Number(maxBathrooms);

    const skip = (Number(page) - 1) * Number(limit);
    const properties = await Property.find(filter)
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(Number(limit));

    res.json({
        success: true,
        message: 'Properties retrieved successfully',
        data: { properties }
    });
});

// Get Property by ID
export const getPropertyById = asyncHandler(async (req: Request, res: Response) => {
    const property = await Property.findById(req.params.id);
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    res.json({
        success: true,
        message: 'Property retrieved successfully',
        data: { property }
    });
});

// Update Property
export const updateProperty = asyncHandler(async (req: Request, res: Response) => {
    const property = await Property.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true, runValidators: true }
    );
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    res.json({
        success: true,
        message: 'Property updated successfully',
        data: { property }
    });
});

// Delete Property
export const deleteProperty = asyncHandler(async (req: Request, res: Response) => {
    const property = await Property.findByIdAndDelete(req.params.id);
    if (!property) {
        throw new AppError('Property not found', 404);
    }
    res.json({
        success: true,
        message: 'Property deleted successfully',
        data: {}
    });
});
