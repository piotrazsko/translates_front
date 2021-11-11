import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Crop from '../Crop';

function Dropzone({ children, onDrop, isMobile = false, className }) {
    const [image, setImage] = React.useState();
    const onDropCallback = useCallback(acceptedFiles => {
        const file = acceptedFiles[0];
        const image = new Image();
        image.type = file.type;
        image.src = URL.createObjectURL(file);

        image.onload = () => {
            setImage(image);
        };

        // Do something with the files
    }, []);
    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop: onDropCallback,
        maxFiles: 1,
        accept: 'image/*',
    });

    return (
        <div className={className} {...getRootProps()}>
            <input {...getInputProps()} />

            {children}
            {image && (
                <Crop
                    styleCrop={{
                        maxHeight: isMobile ? '57.1vw' : '45vh',
                        maxWidth: isMobile ? '80vw' : '63vh',
                    }}
                    onCancellCallback={() => {
                        setImage();
                    }}
                    onSubmitCallback={data => {
                        onDrop(data);
                        setImage();
                    }}
                    image={image}
                />
            )}
        </div>
    );
}
export default Dropzone;
