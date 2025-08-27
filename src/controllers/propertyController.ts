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
    console.log(req.query)
    const {
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

    const currentPage = Number(page);
    const itemsPerPage = Number(limit);
    const skip = (currentPage - 1) * itemsPerPage;

    const [properties, totalItems] = await Promise.all([
        Property.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(itemsPerPage),
        Property.countDocuments(filter),
    ]);

    const totalPages = Math.ceil(totalItems / itemsPerPage);


    res.json({
        success: true,
        message: "Properties retrieved successfully",
        data: {
            properties,
            totalItems,
            totalPages,
            currentPage,
            itemsPerPage,
        },
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
