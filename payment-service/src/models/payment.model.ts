import mongoose, { Document, Schema } from "mongoose";

export interface PaymentDocument extends Document {
    user: mongoose.Types.ObjectId; // Reference to the User model
    course: mongoose.Types.ObjectId; // Reference to the Course model
    amount: number;
    transactionId: string;
    paymentDate: Date;
}

const paymentSchema = new Schema<PaymentDocument>({
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    course: { type: Schema.Types.ObjectId, ref: 'Course', required: true },
    amount: { type: Number, required: true },
    transactionId: { type: String, required: true },
    paymentDate: { type: Date, default: Date.now }
});

const PaymentModel = mongoose.model<PaymentDocument>('Payment', paymentSchema);

export default PaymentModel;
