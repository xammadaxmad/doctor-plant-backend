let request = require('request');

function getPlantHealthStatusFromAPI(image, apiKey = "MfZVkMyQUegVE6mqNK8FwlYtVQbYsJB7PwIBemeRf7zWWHmg7d") {
    return new Promise((resolve, reject) => {
        const options = {
            method: 'POST',
            url: 'https://plant.id/api/v3/health_assessment',
            headers: {
                'Api-Key': apiKey,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "images": [image],
                "latitude": 49.207,
                "longitude": 16.608,
                "similar_images": true
            })
        };

        request(options, (error, response) => {
            if (error) {
                return reject(error);
            }
            try {
                let jsonResponse = JSON.parse(response.body);
                let isHealthy = jsonResponse.result.is_healthy.binary;
                let arrDiseases = jsonResponse.result.disease.suggestions.sort((a, b) => b.probability - a.probability);
                let disease = arrDiseases[0];
                let healthStatus = {
                    'isHealthy': isHealthy,
                    'disease': disease.name,
                    'probability': disease.probability,
                };
                resolve(healthStatus);
            } catch (e) {
                reject(e);
            }
        });
    });
}

module.exports = {
    getPlantHealthStatusFromAPI
}
