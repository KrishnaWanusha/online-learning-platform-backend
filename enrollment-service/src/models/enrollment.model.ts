import mongoose, { Document, Schema } from "mongoose";

export interface EnrollmentDocument extends Document {
    user: mongoose.Types.ObjectId;
    course: mongoose.Types.ObjectId;
    enrollmentDate: Date;
    completionStatus: boolean;
}

const enrollmentSchema = new Schema<EnrollmentDocument>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    enrollmentDate: { type: Date, default: Date.now },
    completionStatus: { type: Boolean, default: false }
});

const EnrollmentModel = mongoose.model<EnrollmentDocument>('Enrollment', enrollmentSchema);

export default EnrollmentModel;
