import { Request, Response } from 'express';
import asyncHandler from 'express-async-handler';
import Property from '../models/property';
import AppError from '../util/AppError';
import cloudinary from '../config/cloudinary';
import { Types } from 'mongoose';
import { IUser } from '../models/user';

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
    if (!req.user) {
        throw new AppError('User not authenticated', 401);
    }


    const propertyData = {
        ...req.body,
        images: imageUrls,
        user: new Types.ObjectId((req.user as IUser)._id)
    };

    const property = await Property.create(propertyData);

    res.status(201).json({
        success: true,
        message: 'Property created successfully',
        data: { property }
    });
});

// Get Properties with Filters, Sorting, Pagination
export const getProperties = asyncHandler(async (req: Request, res: Response) => {
    let {
        search,
        minPrice,
        maxPrice,
        propertyType,
        minBedrooms,
        minBathrooms,
        page = 1,
        limit = 10,
    } = req.query;

    const filter: any = {};

    if (search) {
        const regex = new RegExp(search as string, "i");
        filter.$or = [
            { "location.city": regex },
            { "location.state": regex },
            // { title: regex },
            // { description: regex },
        ];
    }

    if (propertyType) {
        filter.propertyType = propertyType;
    }

    if (minPrice || maxPrice) {
        filter.price = {};
        if (minPrice) filter.price.$gte = Number(minPrice);
        if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    if (minBedrooms) {
        filter.bedrooms = {};
        if (minBedrooms) filter.bedrooms.$gte = Number(minBedrooms);
    }

    if (minBathrooms) {
        filter.bathrooms = {};
        if (minBathrooms) filter.bathrooms.$gte = Number(minBathrooms);
    }

    page = Number(page)
    limit = Number(limit)
    const skip = (page - 1) * limit;

    const [properties, totalItems] = await Promise.all([
        Property.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit),
        Property.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / limit);


    res.json({
        success: true,
        message: "Properties retrieved successfully",
        data: {
            properties,
            totalItems,
            totalPages,
            page,
            limit,
        },
    });
});

// Get Property by ID
export const getPropertyById = asyncHandler(async (req: Request, res: Response) => {
    const property = await Property.findById(req.params.id).populate('user');
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

export const getPropertiesByUser = asyncHandler(async (req: Request, res: Response) => {
    let { page = 1, limit = 10 } = req.query;
    page = Number(page);
    limit = Number(limit);

    const [properties, totalItems] = await Promise.all([
        Property.find({ user: new Types.ObjectId(req.params.id) })
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(limit),
        Property.countDocuments({ user: new Types.ObjectId(req.params.id) })
    ])
    const totalPages = Math.ceil(totalItems / limit);

    res.json({
        success: true,
        message: 'Properties retrieved successfully',
        data: {
            properties,
            totalItems,
            totalPages,
            page,
            limit
        }
    });
});

