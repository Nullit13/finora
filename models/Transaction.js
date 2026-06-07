const mongoose = require("mongoose");

const TransactionSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        amount: {
            type: Number,
            required: true,
        },
        type: {
            type: String,
            required: true,
            enum: ['expense', 'earning']
        },
        category: {
            type: String,
            required: true,
        },
        date: {
            type: Date,
            required: true,
            default: Date.now
        }
    },
    {
        timestamps: true
    }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);
module.exports = Transaction;