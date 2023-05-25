import PhoneModel from '../models/Phone.js';

export const create = async (req, res) => {
    try{
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

export const getAll = async(req, res) => {
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

export const getOne = async (req, res) => {
    try{
        const phoneId = req.params.id;

        const phone = await PhoneModel.findOne({_id:phoneId}); 
        res.json(phone);
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Не удалось получить телефон',
        });
    }
}

export const remove = async (req, res) => {
    try{
        const phoneId = req.params.id;
        
        await PhoneModel.findOneAndDelete(
            {_id:phoneId}
            );
        res.json({
            success:true,
        });
    }catch(err){
        console.log(err);
        res.status(500).json({
            message:'Не удалось удалить телефон',
        });
    }
}

export const update = async (req, res) => {
    try{
        const phoneId = req.params.id;

        await PhoneModel.updateOne(
            {
                _id:phoneId,
            }, {
                phoneGroup: req.body.phoneGroup,
                src : req.body.src,
                picW : req.body.picW,
                picH : req.body.picH,
                phoneName : req.body.phoneName,
                memorySize : req.body.memorySize,
                price : req.body.price,
            },
        );
        res.json({
            success:true,
        })
    }catch{err}{
        console.log(err);
        res.status(500).json({
            message:'Не удалось обновить данные телефона',
        });
    }
}