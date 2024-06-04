import imageCompression from 'browser-image-compression';

export default class ImageHelper {
    async resizeBase64Image( base64Image: string ) {
        const options = {
            maxSizeMB: 1, // (default: Number.POSITIVE_INFINITY)
            maxWidthOrHeight: 1024, // compress file ratio (default: undefined)
            useWebWorker: true, // optional, use multi-thread web worker, fallback to run in main-thread (default: true)
            maxIteration: 10 // optional, max number of iteration to compress the image (default: 10)
        };
        const fileImage = await imageCompression.getFilefromDataUrl( base64Image, '' );

        const compressImage = await imageCompression( fileImage, options );
        const base64 = await imageCompression.getDataUrlFromFile( compressImage );

        return base64;
    }
}