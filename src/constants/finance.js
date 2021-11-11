export const PAYMENTS_TYPE = [
    {
        id: 1,
        label: 'Расходные материалы',
        value: 'consumables',
    },
    { id: 2, label: 'Реклама', value: 'advertising' },
    { id: 3, label: 'Аренда', value: 'rent' },
    { id: 4, label: 'Оборудование', value: 'equipment' },
    { id: 5, label: 'Обучение', value: 'education' },
    { id: 6, label: 'Услуга', value: 'service' },
    { id: 7, label: 'Товар', value: 'goods' },
    { id: 8, label: 'Другое', value: 'other' },
    { id: 9, label: 'Зарплата сотрудникам', value: 'salary' },
];

// Artur Kalandarov, [10.12.20 16:03]
// enum class PaymentPurpose(val id: Int, val resId: Int) {
//     CONSUMABLES(1, R.string.consumables),
//     ADVERTISING(2, R.string.advertising),
//     RENT(3, R.string.rent),
//     EQUIPMENT(4, R.string.equipment),
//     EDUCATION(5, R.string.education),
//     SERVICE(6, R.string.service),
//     GOODS(7, R.string.goods),
//     OTHER(8, R.string.other);
//
//     companion object {
//
//         fun getPaymentPurpose(id: Int): PaymentPurpose = values().firstOrNull { it.id == id } ?: OTHER
//     }
// }
//
// Artur Kalandarov, [10.12.20 16:04]
// <string name="consumables">Расходные материалы</string>
//     <string name="advertising">Реклама</string>
//     <string name="rent">Аренда</string>
//     <string name="equipment">Оборудование</string>
//     <string name="education">Обучение</string>
//     <string name="goods">Товар</string>
//     <string name="other">Другое</string>

// Для дохода  выпадающие типы в списке
// - Услуга
// - Обучение
// - Товар
// - Аренда
// - Другое
//
// Для расходов
// - Услуга
// - Расходные материалы
// - Реклама
// - Аренда
// - Оборудование
// - Обучение
// - Другое
