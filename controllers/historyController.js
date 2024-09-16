const historyService = require('../services/historyService');
const response = require('../utils/response')


const uploadImage = async (req, res) => {
    try {
        const { filename, path } = req.file; // Assuming multer middleware for file upload
        const newHistory = await historyService.createHistory(filename, path, req.user._id);
        const { headers, method, url } = req;
        const baseUrl = `${headers['x-forwarded-proto'] || req.protocol}://${headers.host}`;
        newHistory.image_path = `${baseUrl}/${newHistory.image_path}`
        res.status(201).json(response.forge("Image has been uploaded successfully",newHistory));
    } catch (error) {
        res.status(400).json(response.forge(error.message));
    }
};
  
const getHistory = async (req, res) => {
    try {
        const { headers, method, url } = req;
        const baseUrl = `${headers['x-forwarded-proto'] || req.protocol}://${headers.host}`;
        const history = await historyService.getHistory(req.user._id);
        arrReturn = []
        history.forEach((row)=>{
            row.image_path = `${baseUrl}/${row.image_path}`
            arrReturn.push(row)
        })
        res.status(200).json(response.forge("", arrReturn));
    } catch (error) {
        res.status(500).json(response.forge(error.message));
    }
};

const deleteHistory = async (req, res) => {
    try {
        await historyService.deleteHistory(req.params.id);
        res.status(204).json(response.forge("History has been deleted successfully"));
    } catch (error) {
        res.status(500).json(response.forge(error.message));
    }
};

module.exports = {
    uploadImage,
    getHistory,
    deleteHistory
};
