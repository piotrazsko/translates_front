import { Select as SelectDefault } from 'feelqueen_components';

export const optionsPreparingSelect = (arr, valueKey, labelKey) =>
    arr.map(item => {
        return typeof item === 'object'
            ? { value: item[valueKey], label: item[labelKey] }
            : { value: item, label: item };
    });

export default SelectDefault;
