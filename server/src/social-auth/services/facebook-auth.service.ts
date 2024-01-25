// import { Injectable } from '@nestjs/common';
// import { InjectModel } from '@nestjs/mongoose';
// import { Model } from 'mongoose';
// import { User, UserDocument } from '../../users/entities/user.entity';

// @Injectable()
// export class FacebookAuthService {
//     constructor(@InjectModel(User.name) private readonly userModel: Model<UserDocument>) {}

//     // async findOrCreate(data: {name: string; email: string; password: string; birth_date?: Date | null; location?: string | null; company_name?: string | null }): Promise<UserDocument> {
//         async findOrCreate(data: { email: string; password: string;  }): Promise<UserDocument> {
//             const {  email } = data;

//         let user = await this.userModel.findOne({ email });

//         if (!user) {
//             const userData: any = {
//                 email,
//                 password: 12345,
//                 // birth_date: data.birth_date !== undefined ? data.birth_date : null,
//                 // location: data.location !== undefined ? data.location : null,
//                 // company_name: data.company_name !== undefined ? data.company_name : null,
//             };
//             user = await this.userModel.create(userData);

//         }

//         return user;
//     }
// }

import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Document } from 'mongoose';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class FacebookAuthService {
    constructor(@InjectModel(User.name) private readonly userModel: Model<Document>) {}

    async findOrCreate( email: string): Promise<Document> {
        let user = await this.userModel.findOne({ email });
        

        if (!user) {
            user = await this.userModel.create({ email });
        }
        await user.save();

        return user;

    }
}



