const models = require('../src/Models/Model');
const fs = require('fs');
const requests = require('requests');
const apiController = () => {
    return {
        index: async (req, res) => {
            requests(`https://api.wazirx.com/api/v2/tickers`)
                .on("data", async (chunk) => {
                    await fs.writeFile('apiData.json', chunk,()=>{
                        console.log(`JSON DATA IS STORED IN THE FILE`);
                    });
                })
                .on("end", (error) => {
                    if (error) {
                        return console.log('Connection closed due to errors', err);
                    }
                });   
                let db = await models.find();
                const data = JSON.parse(fs.readFileSync('apiData.json', 'utf-8'));
                const array = Object.values(data);
                if (db.length == 0) {
                    let i = 0;
                    let dataMongoose;
                    while (i < 10) {
                        try {
                            const mongodb = new models({
                                name: array[i].name,
                                last: array[i].last,
                                buy: array[i].buy,
                                Sell: array[i].sell,
                                volume: array[i].volume,
                                baseUnit: array[i].base_unit
                            });
                            dataMongoose = await mongodb.save();
                        } catch (error) {
                            console.log(error);
                        }
                        i++;
                    }
                    dataMongoose = await models.find();
                    res.render('index',{result:dataMongoose});
                }
                else
                {
                    const deleteData = await models.deleteMany();
                    let i = 0;
                    let dataMongoose;
                    while(i < 10)
                    {
                        try {
                            const updateMongodb = new models({
                                name: array[i].name,
                                last: array[i].last,
                                buy: array[i].buy,
                                Sell: array[i].sell,
                                volume: array[i].volume,
                                baseUnit: array[i].base_unit
                            });
                            dataMongoose = await updateMongodb.save();
                        } catch (error) {
                            console.log(error);
                        }
                        i++;
                    }
                    dataMongoose = await models.find();
                    res.render('index',{result:dataMongoose});
                }
        }
    }
}
module.exports = apiController;