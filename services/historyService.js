const History = require('../models/History');

const createHistory = async (image_name, image_path, created_by) => {
    const newHistory = new History({ image_name, image_path, created_by });
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
