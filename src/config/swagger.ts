import { Express } from 'express';
import swaggerUi from 'swagger-ui-express';
import YAML from 'yamljs';
import path from 'path';
import fs from 'fs';

/**
 * Loads and merges all YAML files in the docs/ directory for Swagger.
 * @returns {object} The merged Swagger document
 */
function loadSwaggerDocs(): object {
    const docsDir = path.resolve(__dirname, '../../docs');
    const files = fs.readdirSync(docsDir).filter(f => f.endsWith('.yaml') || f.endsWith('.yml'));
    let mergedDoc: any = null;
    for (const file of files) {
        const doc = YAML.load(path.join(docsDir, file));
        if (!mergedDoc) {
            mergedDoc = doc;
        } else {
            // Merge paths and tags
            mergedDoc.paths = { ...mergedDoc.paths, ...doc.paths };
            if (doc.tags) {
                mergedDoc.tags = [...(mergedDoc.tags || []), ...doc.tags];
            }
        }
    }
    return mergedDoc;
}

/**
 * Sets up Swagger UI at /api-docs
 * @param app Express app instance
 */
export function setupSwagger(app: Express): void {
    const swaggerDocument = loadSwaggerDocs();
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
}