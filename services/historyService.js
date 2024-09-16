const History = require('../models/History');
const fs = require('fs')
const predictor = require("../utils/predictor")

const createHistory = async (image_name, image_path, created_by) => {
    const imageBuffer = fs.readFileSync(image_path);
    let base64Image = imageBuffer.toString('base64');
    let completeImageString = "data:image/jpeg;base64,"+ base64Image
    let response = await predictor.getPlantHealthStatusFromAPI(completeImageString)
    let disease = response.disease
    let probability = response.probability
    const newHistory = new History({ image_name, image_path, disease, probability, created_by });
    return await newHistory.save();
};

const getHistory = async (userId) => {
    return await History.find({ created_by: userId }).sort({ created_at: -1 });
};

const deleteHistory = async (historyId) => {
    return await History.findByIdAndDelete(historyId);
};

module.exports = {
    createHistory,
    getHistory,
    deleteHistory
};
