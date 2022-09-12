import React, { useEffect } from 'react';
import {
    Grid,
    Button,
    makeStyles,
    FormControlLabel,
    Checkbox
} from "@material-ui/core";
import SearchIcon from '@material-ui/icons/Search';
import './HealthOrgFilter.css';
import { useTranslation } from 'react-i18next';
const useStyles = makeStyles((theme) => ({
    formControl: {
        width: '100%'
    }
}));


export default function HealthOrgFilter(props) {

    const classes = useStyles();

    const { t } = useTranslation();

    const {
        search
    } = props;

    const [checking, setChecking] = React.useState(false);

    const [screening, setScreening] = React.useState(false);

    const [manage, setManage] = React.useState(false);

    const [treatment, setTreatment] = React.useState(false);

    const [confirm, setconfirm] = React.useState(false);

    return (
        <Grid className="filter-container" container md={12} spacing={2}>
            <Grid item sm={8} xs={6}>
                <FormControlLabel
                    value={checking}
                    name="checking"
                    onChange={() => {
                        setChecking(!checking)
                    }}
                    control={<Checkbox checked={checking} />}
                    label="Đơn vị rà soát"
                />
                <FormControlLabel
                    value={screening}
                    name="screening"
                    onChange={() => {
                        setScreening(!screening)
                    }}
                    control={<Checkbox checked={screening} />}
                    label="Đơn vị sàng lọc"
                />
                <FormControlLabel
                    value={manage}
                    name="manager"
                    onChange={() => {
                        setManage(!manage)
                    }}
                    control={<Checkbox checked={manage} />}
                    label="Đơn vị quản lý"
                />
                <FormControlLabel
                    value={confirm}
                    name="confirmation"
                    onChange={() => {
                        setconfirm(!confirm)
                    }}
                    control={<Checkbox checked={confirm} />}
                    label="Đơn vị khẳng định"
                />
                <FormControlLabel
                    value={treatment}
                    name="treatment"
                    onChange={() => {
                        setTreatment(!treatment)
                    }}
                    control={<Checkbox checked={treatment} />}
                    label="Đơn vị điều trị"
                />
            </Grid>

            <Grid item md={4} lg={4} sm={6}>
                <Button
                    variant="contained"
                    className="btn btn-primary-d d-inline-flex"
                    onClick={() => {
                        var searchObject = {};
                        searchObject.checking = checking
                        searchObject.screening = screening
                        searchObject.manager = manage
                        searchObject.confirmation = confirm
                        searchObject.treatment = treatment
                        search(searchObject)
                    }}
                >
                    <SearchIcon />
                    {t("general.button.search")}
                </Button>
            </Grid>
        </Grid>
    );
}