const express = require("express");
const router = express.Router();
const Transaction = require("../models/Transaction");
const auth = require("../middleware/auth");

router.post("/", auth, async (req, res) => {
  try {
    const { title, amount, type, category, date } = req.body;

    if (!title || !amount || !type || !category) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    const transaction = new Transaction({
      user: req.userId,
      title,
      amount,
      type,
      category,
      date: date || Date.now(),
    });

    await transaction.save();
    res.status(201).json(transaction);
  } catch (err) {
    res.status(500).send("Server error");
  }
});

router.get("/fetch", auth, async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server error");
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    const transactionId = req.params.id;
    const transaction = await Transaction.findById(transactionId);
    
    if (!transaction) {
      console.log("Transaction not found:", transactionId);
      return res.status(404).json({ msg: 'Transaction not found' });
    }
    
    if (transaction.user.toString() !== req.userId) {
      console.log("User not authorized to delete this transaction");
      return res.status(401).json({ msg: 'Not authorized' });
    }
    
    await transaction.deleteOne();
    
    res.json({ msg: 'Transaction removed successfully' });
  } catch (err) {
    console.error("Error deleting transaction:", err.message);
    
    if (err.name === 'CastError') {
      return res.status(400).json({ msg: 'Invalid transaction ID' });
    }
    
    res.status(500).send('Server error');
  }
});

module.exports = router;