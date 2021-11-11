export const REQUEST_STATUS = 1;
export const CONFIRMED_STATUS = 3;
export const FINISHED_STATUS = 4;
export const CANCELLED_STATUS_BY_MASTER = 6;
export const CANCELLED_STATUS_BY_CLIENT = 5;

export const PAYMENT_CASSHLESS = 6;
export const PAYMENT_GOOGLE = 5;
export const PAYMENT_APPLE = 4;
export const PAYMENT_CARD = 3;
export const PAYMENT_ONLINE = 2;
export const PAYMENT_CASH = 1;

export const getTextByPayment = type => {
    switch (type) {
        case PAYMENT_CASSHLESS:
            return 'Безналичный';
        case PAYMENT_CASH:
            return 'Наличные';
        case PAYMENT_CARD:
            return 'Карта';
        case PAYMENT_APPLE:
            return 'Apple Pay';
        case PAYMENT_GOOGLE:
            return 'Google Pay';
        case PAYMENT_ONLINE:
            return 'Online';
        default:
            return '';
    }
};
// item.status_id === 1
//     ? style.request
//     : item.status_id === 3
//     ? style.confirmed
//     : item.status_id === 4
//     ? style.finished
//     : style.canceled,
