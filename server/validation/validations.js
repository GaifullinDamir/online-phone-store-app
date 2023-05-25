import {body} from 'express-validator';

export const phoneCreateValidation = [
    body('src', 'Вы забыли указать ссылку.').isLength({min:1}),
    body('picW', 'Вы забыли указать ширину картинки.').isLength({min:1}),
    body('picH', 'Вы забыли указать высоту картинки.').isLength({min:1}),
    body('phoneName', 'Вы забыли указать название телефона.').isLength({min:1}),
    body('memorySize', 'Вы забыли указать объём памяти.').isLength({min:1}),
    body('price', 'Вы забыли указать стоимость телефона.').isLength({min:1}),
];