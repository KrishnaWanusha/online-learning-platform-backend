import mongoose, { Document, Schema } from "mongoose";

export enum CourseLevel {
    Beginner = "Beginner",
    Intermediate = "Intermediate",
    Advanced = "Advanced",
}

export interface CourseDocument extends Document {
    title: string;
    description: string;
    instructor: mongoose.Types.ObjectId;
    category: string[];
    level: CourseLevel;
    price: number;
    duration: string;
    lectures: {
        title: string;
        content: string;
        duration: string;
    }[];
}

const courseSchema = new Schema<CourseDocument>({
    title: { type: String, required: true },
    description: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    category: [{ type: String }],
    level: { type: String, required: true, enum: Object.values(CourseLevel) },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    lectures: [{
        title: { type: String, required: true },
        content: { type: String, required: true },
        duration: { type: String, required: true }
    }]
});

const CourseModel = mongoose.model<CourseDocument>('Course', courseSchema);

export default CourseModel;
