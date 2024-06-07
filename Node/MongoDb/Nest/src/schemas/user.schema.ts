import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

// export type CatDocument = HydratedDocument<Cat>;

@Schema({
    timestamps: true
})
export class User {
    @Prop({ required: true, maxlength: 50 })
    fname: string;

    @Prop({ maxlength: 50 })
    lname: string;

    @Prop({ maxlength: 150 })
    email: string;

    @Prop()
    password: string;

    @Prop({ maxlength: 20 })
    phone_number: string;

    @Prop({ maxlength: 6 })
    phone_country_code: string;

    @Prop({ type: Boolean, default: 1 })
    status: boolean;

    @Prop({ type: Boolean, default: 1 })
    is_notification: boolean;

    @Prop({ type: Date })
    email_verified_at: string;

    @Prop({ default: 0 })
    logged_in_device_count: number;

    @Prop({ default: 0 })
    is_deleted: boolean;

    @Prop({ type: Date })
    is_deleted_date: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
