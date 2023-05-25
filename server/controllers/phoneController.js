import PhoneModel from '../models/Phone.js';

export const create = async (req, res) => {
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json(errors.array());
        }

        const doc = new PhoneModel({
            phoneGroup: req.body.phoneGroup,
            src : req.body.src,
            picW : req.body.picW,
            picH : req.body.picH,
            phoneName : req.body.phoneName,
            memorySize : req.body.memorySize,
            price : req.body.price,
        })

        const phone = await doc.save();
        res.json(phone);

    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:'Не удалось добавить телефон',
        });
    }
};

export const get = async(req, res) => {
    try{
        const iphones = await PhoneModel.find({'phoneGroup':'iphones'});
        const samsungs = await PhoneModel.find({'phoneGroup':'samsungs'});
        const honors = await PhoneModel.find({'phoneGroup':'honors'})
        

        res.json([iphones, samsungs, honors]);
    } catch(err){
        console.log(err);
        res.status(500).json({
            message:'Не удалось получить телефоны',
        });
    }
};