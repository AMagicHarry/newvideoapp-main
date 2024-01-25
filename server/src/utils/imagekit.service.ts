import { Injectable, BadRequestException } from '@nestjs/common';
import axios from 'axios';
import * as FormData from 'form-data'

@Injectable()
export class ImageKitService {
    private apiKey: string;
    private endpoint: string;
    private apiBaseUrl: string;
    constructor() {
        // Replace with your ImageKit API credentials
        this.apiKey = process.env.IMAGE_KIT_API_KEY
        this.endpoint = 'https://upload.imagekit.io/api/v1/files/upload'
        this.apiBaseUrl = 'https://api.imagekit.io/v1/files/';

    }
    async uploadImage(file: any, name: string): Promise<any> {
        try {
            const formData = new FormData();
            formData.append('file', file.buffer, name); // Append the file with the appropriate field name and filename
            formData.append('fileName', name);
            let video_url: string = ''
            await axios.post(this.endpoint, formData, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString(
                        'base64',
                    )}`,
                    'Content-Type': 'multipart/form-data',
                },
            }).then((res) => {
                video_url = res.data.url
            }).catch((error) => {
                throw new BadRequestException(error)
            })
            return video_url
            // return response.data;
        } catch (error) {
            console.error('Error uploading image to ImageKit:', error);
            throw new BadRequestException(error)
        }
    }

    async listAllFiles(): Promise<any> {
        try {
            const response = await axios.get('https://api.imagekit.io/v1/files', {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching video list from ImageKit:', error);
            throw new BadRequestException('Error fetching video list from ImageKit');
        }
    }

    async getVideoMetadata(fileId: string): Promise<any> {
        try {
            const response = await axios.get(`${this.apiBaseUrl}${fileId}/details`, {
                headers: {
                    Authorization: `Basic ${Buffer.from(`${this.apiKey}:`).toString('base64')}`,
                },
            });

            return response.data;
        } catch (error) {
            console.error('Error fetching video metadata from ImageKit:', error);
            throw new BadRequestException('Error fetching video metadata from ImageKit');
        }
    }


}

