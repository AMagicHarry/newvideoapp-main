import { Test, TestingModule } from '@nestjs/testing';
import { VideoUploadingService } from './video-uploading.service';

describe('VideoUploadingService', () => {
  let service: VideoUploadingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VideoUploadingService],
    }).compile();

    service = module.get<VideoUploadingService>(VideoUploadingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
