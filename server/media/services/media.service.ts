import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid'; 


@Injectable()
export class MediaService {
  private readonly assetsFolder = 'assets';
  private readonly interviewsVideosFolder = 'interviews_videos';
  private readonly profileImagesFolder = 'profile_images';

  private readonly baseURL = 'https://api.videointerviews.io/';


  constructor() {
    // Ensure that the assets folder exists
    if (!fs.existsSync(this.assetsFolder)) {
      fs.mkdirSync(this.assetsFolder);
    }

    // Ensure that the interviews_videos folder exists within assets
    const interviewsVideosFolderPath = path.join(this.assetsFolder, this.interviewsVideosFolder);
    if (!fs.existsSync(interviewsVideosFolderPath)) {
      fs.mkdirSync(interviewsVideosFolderPath);
    }
  }

  saveImage(file: Express.Multer.File): string {
    const imagePath = path.join(this.assetsFolder, file.originalname);
    fs.writeFileSync(imagePath, file.buffer);
    return imagePath;
  }

  saveVideo(file: Express.Multer.File): string {
    try {
      const uniqueID = uuidv4();
      const videoFileName = `${uniqueID}_${file.originalname}`;
      const videoPath = path.join(this.assetsFolder, this.interviewsVideosFolder, videoFileName);
      fs.writeFileSync(videoPath, file.buffer);
      
      const videoUrl = `${this.baseURL}${this.assetsFolder}/${this.interviewsVideosFolder}/${videoFileName}`;
      return videoUrl;
    } catch (error) {
      console.error('Error saving video:', error);
      throw new Error('Error saving video');
    }
  }


    saveProfileImage(file: Express.Multer.File): string {
    try {
      const uniqueID = uuidv4();
      const ProfileFileName = `${uniqueID}_${file.originalname}`;
      const ProfilePath = path.join(this.assetsFolder, this.profileImagesFolder, ProfileFileName);
      fs.writeFileSync(ProfilePath, file.buffer);
      
      const ProfileUrl = `${this.baseURL}${this.assetsFolder}/${this.profileImagesFolder}/${ProfileFileName}`;
      return ProfileUrl;
    } catch (error) {
      console.error('Error saving profile image:', error.message);
      throw new Error('Error saving profile image');
    }
  }

}
