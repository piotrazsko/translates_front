import { endpoints } from 'constants/viewport';
const getViewport = () => {
    let result;

    const width = window.innerWidth || document.body.clientWidth;
    const height = window.innerHeight || document.body.clientHeight;
    // |0px     600px    960px    1280px   1920px
    if (width > endpoints.lg) {
        result = {
            name: 'desktop',
            isDesktop: true,
            isTablet: false,
            isMobile: false,
            height: height,
            width: width,
        };
    } else if (width > endpoints.md) {
        result = {
            name: 'tablet',
            isDesktop: false,
            isTablet: true,
            isMobile: false,
            height: height,
            width: width,
        };
    } else {
        result = {
            name: 'mobile',
            isDesktop: false,
            isTablet: false,
            isMobile: true,
            height: height,
            width: width,
        };
    }

    if (height > 900) {
        result.name += '-high';
        result.isHigh = true;
    } else {
        result.name += '-small';
        result.isHigh = false;
    }

    return result;
};

export default getViewport;
