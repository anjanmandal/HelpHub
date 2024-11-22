const express = require('express');
const { OpenAI } = require('openai');
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
require('dotenv').config();

const router = express.Router();

// Initialize OpenAI with API Key
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// @route   POST /api/openai/enhance-description
// @desc    Enhance help request description using OpenAI
// @access  Private
router.post(
  '/enhance-description',
  [
    auth, // Ensure the user is authenticated
    [
      check('description', 'Description is required').not().isEmpty(),
      check('description', 'Description must be at least 10 characters').isLength({ min: 10 }),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      // Send all validation errors
      return res.status(400).json({ errors: errors.array() });
    }

    const { description } = req.body;

    try {
      // Prepare the prompt for OpenAI
      const prompt = `Please enhance the following help request description to make it clear, detailed, and professional:\n\n"${description}"\n\nEnhanced Description:`;

      // Call OpenAI's API using the latest method
      const completion = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo', // Adjust to your preferred model (e.g., 'gpt-4' or 'gpt-3.5-turbo')
        messages: [
          { role: 'system', content: 'You are a helpful assistant.' },
          { role: 'user', content: prompt },
        ],
        max_tokens: 250, // Ensure camelCase for options
        temperature: 0.7,
      });

      // Extract the enhanced description
      const enhancedDescription = completion.choices[0].message.content.trim();

      res.json({ enhancedDescription });
    } catch (err) {
      console.error('OpenAI API Error:', err.message || err.response?.data);
      res.status(500).json({ msg: 'Failed to enhance description. Please try again later.' });
    }
  }
);

module.exports = router;
