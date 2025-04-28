import fs from 'fs';
import multer from 'multer';
import path from 'path';




export const createStorage = (folderName: string) => multer.diskStorage({
    destination: (req, file, cb) => {
        const folderPath = path.join(__dirname, '../files', folderName);
        if (!fs.existsSync(folderPath)) {
            fs.mkdirSync(folderPath, { recursive: true });
        }
        cb(null, folderPath);
    },
    filename: (req, file, cb) => {
        const ticketId = req.query.ticketId;
        const userId = req.query.userId;
        if (!userId || !ticketId) {
            return cb(new Error('User ID and Ticket ID are required'), '');
        }

        const originalName = path.basename(file.originalname, path.extname(file.originalname));
        // Clean up the original name, replace spaces with underscores, and remove invalid characters
        const cleanedOriginalName = originalName.replace(/\s+/g, '_').replace(/[^\w\-_.]+/g, '');

        // Use the ticketId and userId in the format as per the requirement
        let baseFilename = `${cleanedOriginalName}_${userId}_${ticketId}`;

        let filePath = path.join(__dirname, '../files', folderName, baseFilename + path.extname(file.originalname));
        let version = 1;

        // Check if the file already exists, and if so, increment the version number
        while (fs.existsSync(filePath)) {
            baseFilename = `${cleanedOriginalName}_${userId}_${ticketId}_v${version}`;
            filePath = path.join(__dirname, '../files', folderName, baseFilename + path.extname(file.originalname));
            version++;
        }
        cb(null, baseFilename + path.extname(file.originalname));
    }
});


export const uploadImage = (folderName: string) => multer({
    storage: createStorage(folderName),
    limits: { fileSize: 1 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
        const fileTypes = /jpeg|jpg|png/;
        const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
        const mimeType = fileTypes.test(file.mimetype);

        if (extname && mimeType) {
            cb(null, true);
        } else {
            cb(new Error('Only images are allowed'));
        }
    }
}).single('image');