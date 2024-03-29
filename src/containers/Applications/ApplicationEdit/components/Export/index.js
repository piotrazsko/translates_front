import React from 'react';
import { Button, Box, Grid } from '@mui/material';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    upload: {
        marginLeft: 24,
    },
    buttonContainer: {
        marginTop: 20,
    },
    text: {
        fontWeight: 400,
    },
});

const Export = ({
    data = {},
    t,
    onDownloadJSON,
    onDownloadXML,
    onUpload,
    inputFileRef,
}) => {
    const classes = useStyles();
    const [value, setValue] = React.useState(0);
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={2}>
                <Box>
                    <Tabs
                        orientation="vertical"
                        variant="scrollable"
                        value={value}
                        onChange={handleChange}
                        aria-label="Vertical tabs example"
                        sx={{ borderRight: 1, borderColor: 'divider' }}
                    >
                        <Tab label="Web (JSON)" />
                    </Tabs>
                </Box>
            </Grid>
            <Grid item xs={10}>
                {value === 0 ? (
                    <Box className={classes.buttonContainer}>
                        <Button onClick={onDownloadJSON} variant="contained">
                            {t('application.button_export_translates')}
                        </Button>
                    </Box>
                ) : null}
            </Grid>
        </Grid>
    );
};

export default Export;
