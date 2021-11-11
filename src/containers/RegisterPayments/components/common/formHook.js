import { isEmpty } from "lodash";
import { useCallback, useEffect, useState } from "react";

export const useFormHook = ({
    formId,
    requiredFields,
    getRequiredFields,
    initFormData,
    saveFormData,
    savePreProcess,
    onSaveSuccess,
    customInitDataProcess = false,
}) => {
    const [formData, setFormData] = useState({});
    const [errorsData, setErrorsData] = useState({});
    const [validationOnType, setValidationOnType] = useState(false);

    const onFormFieldChange = (field) => (e) => {
        const {value} = e.target;
        setFormData({...formData, [field]: value});
    }

    const onCustomFieldChange = (field) => (value) => {
        setFormData({...formData, [field]: value});
    };

    const onFileFieldChange = onCustomFieldChange; // it has the same signatures
    const onDateFieldChange = onCustomFieldChange;

    const validateFields = useCallback(() => {
        const reqFields = requiredFields
            ? requiredFields
            : getRequiredFields
                ? getRequiredFields(formData)
                : undefined;

        if (!reqFields || !reqFields.length) {
            return true;
        }
        
        const errorFields = reqFields.filter(field => {const value = formData[field]; return !value});
        if (isEmpty(errorFields)) {
            setErrorsData({});
            return true;
        }

        const errorsData = errorFields.reduce((data, field) => {
            return {...data, [field]: "Поле обязательно для заполнения"}
        }, {})

        setErrorsData(errorsData);
        return false;
    }, [formData, requiredFields])

    const onSave = useCallback(() => {
        const isValid = validateFields(formData);
        if (isValid) {
            const data = savePreProcess ? savePreProcess(formData) : formData;
            saveFormData(formId, data);
            onSaveSuccess(data);
        }
        else {
            setValidationOnType(true)
        }
    })

    useEffect(() => {
        if(validationOnType) {
            validateFields();
        }
    }, [formData, validationOnType])

    useEffect(() => {
        if (!customInitDataProcess && initFormData) {
            setFormData(initFormData)
        }
    }, [initFormData, customInitDataProcess])

    return {
        formData,
        errorsData,
        onFormFieldChange,
        onDateFieldChange,
        onFileFieldChange,
        onCustomFieldChange,
        onSave,
        setFormData, // for manual usage when customInitDataProcess is true
    }
}
